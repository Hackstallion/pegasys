angular.module('pegasys.mapview',['uiGmapgoogle-maps'])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA4Xcj1Zmxjur-7JjJP5imFXy6z7B53rHE',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'places,geometry'
    });
  })
  .controller('MapviewController', function($location,$log,$scope,Mapview,uiGmapGoogleMapApi,uiGmapIsReady,DB) {
    if (!document.cookie.includes('user')) $location.path('/login');
    var startPoint = [];
    var endPoint = [];
    var routeArray = [];
    var bounds = null;
    $scope.changed = '';
    $scope.tripName = null;
    $scope.route = null;
    $scope.startMarker = null;
    $scope.endMarker = null;
    $scope.renderer = null;
    $scope.welcome = 'Enter Your Route';
    $scope.isDriver = false; 
    $scope.startTimes = [null, null, null];
    $scope.endTimes = [null, null, null];
    $scope.fields = [true, false, false];

    var startEvents = {
      /* Another idiosyncracy of the angular-google-maps
      library is that we can't get control of the searchbox objects
      until they trigger an event. We will set the bounds 
      for future requests, but they start out global*/
      places_changed: function (searchBox) {
        var loc = searchBox.getPlaces()[0].geometry.location;
        startPoint = [loc.lat(),loc.lng()];
        $scope.submitPoints();
        searchBox.setBounds($scope.getBounds());
      }
    };
    var endEvents = {
      places_changed: function (searchBox) {
        var loc = searchBox.getPlaces()[0].geometry.location;
        endPoint = [loc.lat(),loc.lng()];
        $scope.submitPoints();
        searchBox.setBounds($scope.getBounds());
      }
    };
    $scope.map = {
      control: {},
      center: {latitude: 30.268995, longitude: -97.740679}, //MakerSquare :)
      zoom: 12
    };
    $scope.startSearchBox = {
      events:startEvents,
      template:'startSearchBox.tpl.html',
      options: {}
    };
    $scope.endSearchBox = {
      events:endEvents,
      template:'endSearchBox.tpl.html',
      control: {}
    };
//time matching stuff
    $scope.changeFields = function(direction){
      $log.log('changing fields');
      $log.log(direction);
      if(direction === 'next'){
        $log.log('next');
        $scope.fields[0] = false;
        $scope.fields[1] = true;
      }else if(direction === 'prev'){
        $scope.fields[0] = true;
        $scope.fields[1] = false;
        $log.log('prev');
      }
      $log.log('fields', $scope.fields);
    };

//time matching stuff
    $scope.timeConvert = function(){

    };

//time matching stuff
    $scope.showSuccess = function(){
      $log.log('showSuccess');
      $scope.fields[0] = false;
      $scope.fields[1] = false;
      $scope.fields[2] = true;
    };

    $scope.seeTrips = function(){
      $location.path('/main');
    };

    $scope.newTrip = function(){
      //not used
      // $scope.fields[0] = true;
      // $scope.fields[1] = false;
      // $scope.fields[2] = false;
    };


    uiGmapGoogleMapApi.then(function(maps) { 
      uiGmapIsReady.promise().then(function(instance) {
        //uiGmapIsReady works here, but not anywhere else.
        var map = instance[0].map;
        $scope.getBounds = function(){
          return map.getBounds();
        };
        $scope.saveInfo = function(){
          var newTrip = {};
          newTrip[$scope.tripName] = {
            driver: $scope.isDriver,
            startPoint: startPoint,
            endPoint: endPoint,
            route: routeArray,
            bounds: bounds,
            startTimes: $scope.startTimes,
            startAddress: null,
            endAddress: null,
            endTimes: $scope.endTimes
          };
          var geocoder = new maps.Geocoder;
          var trip = newTrip[$scope.tripName];
          //geocoding will resolve the endpoints to addresses (as strings). 
          geocoder.geocode({location: new maps.LatLng(trip.startPoint[0],trip.startPoint[1])},function(results,status){
            //geocoding is async. If it fails at any step in the process,
            //submit the route anyway. Addresses are nice to have but we can
            //live without them.
            if(status === maps.GeocoderStatus.OK){
              if (results[0]){ 
                trip.startAddress = results[0].formatted_address;
                geocoder.geocode({'location': new maps.LatLng(trip.endPoint[0],trip.endPoint[1])},function(results,status){
                  if(status === maps.GeocoderStatus.OK){
                    if (results[0]){ 
                      trip.endAddress = results[0].formatted_address;
                      DB.postRequest('createtrip', newTrip);
                    } else {
                    DB.postRequest('createtrip', newTrip);
                    }
                  } else {
                    DB.postRequest('createtrip', newTrip);
                  }
                });
              } else {
                DB.postRequest('createtrip', newTrip);
              }
            } else {
              DB.postRequest('createtrip', newTrip);
            }
          });
          // $scope.changed = 'Submitted!';
          $scope.showSuccess();
        };
        $scope.submitPoints = function (){
          //every time the startpoint, endpoint, or route changes,
          // update the controller's variables.
          if ($scope.startMarker instanceof maps.Marker && $scope.startMarker instanceof maps.Marker){
            $scope.startMarker.setMap(null);
            maps.event.removeListener(startListener);
            $scope.startMarker = null;
            $scope.endMarker.setMap(null);
            maps.event.removeListener(endListener);
            $scope.endMarker = null;

          }
          if ($scope.renderer instanceof maps.DirectionsRenderer) {
            $scope.renderer.setMap(null);
            maps.event.removeListener(routeListener);
            $scope.renderer = null;
          }
          if (startPoint.length && endPoint.length){
            if ($scope.isDriver){
              var service = new maps.DirectionsService();
              var renderer = $scope.renderer = new maps.DirectionsRenderer({
                draggable: true,
                map: map,
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: '#b32400',
                    strokeWeight: 8,
                    strokeOpacity: 0.5
                },
              });
              service.route({
                origin: new maps.LatLng(startPoint[0],startPoint[1]),
                destination: new maps.LatLng(endPoint[0],endPoint[1]),
                travelMode: 'DRIVING'
                },function(result){
                  $scope.route = result;
                  renderer.setDirections(result);
                  routeArray = renderer.getDirections().routes[0].overview_path.map(function(coord){
                    return [coord.lat(),coord.lng()];
                  });
                  bounds = map.getBounds();
                });
              var routeListener = maps.event.addListener(renderer,'directions_changed',function(){
                routeArray = renderer.getDirections().routes[0].overview_path.map(function(coord){
                  return [coord.lat(),coord.lng()];
                });
                bounds = map.getBounds();
              });
            }
            $scope.startMarker = new maps.Marker({
                  position: new maps.LatLng(startPoint[0],startPoint[1]),
                  icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  map: map,
                  title: 'Start',
                  draggable: true
            });
            $scope.endMarker = new maps.Marker({
                  position: new maps.LatLng(endPoint[0],endPoint[1]),
                  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  map: map,
                  title: 'End',
                  draggable: true 
            });
            var startListener = maps.event.addListener($scope.startMarker,'dragend',function(){
              startPoint = [$scope.startMarker.position.lat(),$scope.startMarker.position.lng()];
              bounds = map.getBounds();
            });
            var endListener = maps.event.addListener($scope.endMarker,'dragend',function(){
              endPoint = [$scope.endMarker.position.lat(),$scope.endMarker.position.lng()];
              bounds = map.getBounds();
            });
            var newBounds = new maps.LatLngBounds();
            newBounds.extend($scope.startMarker.getPosition());
            newBounds.extend($scope.endMarker.getPosition());
            map.fitBounds(newBounds);
          }
        };
      });
    });
  });
