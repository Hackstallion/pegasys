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
    $scope.route = null;
    $scope.startMarker = null;
    $scope.endMarker = null;
    $scope.renderer = null;
    $scope.welcome = 'Enter Your Route';
    $scope.isDriver = false; //We'll ultimately pull this from the cookie
    DB.getRequest('profile').then(function(response){
      $log.log('driver: '+response.data.driver);
      $scope.isDriver = response.data.driver;
    });
    var startEvents = {
      places_changed: function (searchBox) {
        var loc = searchBox.getPlaces()[0].geometry.location;
        startPoint = [loc.lat(),loc.lng()];
        $scope.submitPoints();
        searchBox.setBounds($scope.getBounds());
      }
    }
    var endEvents = {
      places_changed: function (searchBox) {
        var loc = searchBox.getPlaces()[0].geometry.location;
        endPoint = [loc.lat(),loc.lng()];
        $scope.submitPoints();
        searchBox.setBounds($scope.getBounds());
      }
    }
    $scope.map = {
      control: {},
      center: {latitude: 30.268995, longitude: -97.740679}, //MakerSquare :)
      zoom: 12
    }
    $scope.startSearchBox = {
      events:startEvents,
      template:'startSearchBox.tpl.html',
      options: {}
    }
    $scope.endSearchBox = {
      events:endEvents,
      template:'endSearchBox.tpl.html',
      control: {}
    }

    $scope.saveInfo = function(){
      if ($scope.isDriver && bounds && routeArray.length){
        DB.postRequest('route',{
          username: document.cookie.substring(5),
          route: routeArray,
          bounds: bounds
        });
      }
      else if (startPoint.length && endPoint.length){
        DB.postRequest('endpoints',{
          username: document.cookie.substring(5),
          startPoint: startPoint,
          endPoint: endPoint
        })
      }
      $log.log('post request submitted')
      $scope.changed = 'Submitted!'
    }

    uiGmapGoogleMapApi.then(function(maps) { 
      uiGmapIsReady.promise().then(function(instance) {
        var map = instance[0].map;
        $scope.getBounds = function(){
          return map.getBounds();
        }
        $scope.submitPoints = function (){
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
                map: map
              });
              service.route({
                origin: new maps.LatLng(startPoint[0],startPoint[1]),
                destination: new maps.LatLng(endPoint[0],endPoint[1]),
                travelMode: 'DRIVING'
                },function(result){
                  $scope.route = result
                  renderer.setDirections(result);
                  routeArray = renderer.getDirections().routes[0].overview_path.map(function(coord){
                    return [coord.lat(),coord.lng()];
                  bounds = map.getBounds();
                });
              });
              var routeListener = maps.event.addListener(renderer,'directions_changed',function(){
                $log.log('directions_changed');
                routeArray = renderer.getDirections().routes[0].overview_path.map(function(coord){
                  return [coord.lat(),coord.lng()];
                });
                bounds = map.getBounds();
              });
            }
            else {
              $scope.startMarker = new maps.Marker({
                    position: new maps.LatLng(startPoint[0],startPoint[1]),
                    map: map,
                    title: 'Start',
                    draggable: true
              });
              $scope.endMarker = new maps.Marker({
                    position: new maps.LatLng(endPoint[0],endPoint[1]),
                    map: map,
                    title: 'End',
                    draggable: true 
              });
              var startListener = maps.event.addListener($scope.startMarker,'dragend',function(){
                $log.log('start marker moved');
                startPoint = [$scope.startMarker.position.lat(),$scope.startMarker.position.lng()]
                bounds = map.getBounds();
              })
              var endListener = maps.event.addListener($scope.endMarker,'dragend',function(){
                $log.log('end marker moved');
                endPoint = [$scope.endMarker.position.lat(),$scope.endMarker.position.lng()]
                bounds = map.getBounds();
              })
              var newBounds = new maps.LatLngBounds();
              newBounds.extend($scope.startMarker.getPosition())
              newBounds.extend($scope.endMarker.getPosition())
              map.fitBounds(newBounds);
            }
          }
        }
      });
    })
  });
