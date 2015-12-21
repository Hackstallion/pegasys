angular.module('pegasys.mapview',['uiGmapgoogle-maps'])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA4Xcj1Zmxjur-7JjJP5imFXy6z7B53rHE',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'places,geometry'
    });
  })
  .controller('MapviewController', function($log,$scope,Mapview,uiGmapGoogleMapApi,uiGmapIsReady,DB) {
    var startPoint = [];
    var endPoint = [];
    var routeArray = [];
    $scope.startMarker = null;
    $scope.endMarker = null;
    $scope.renderer = null;
    $scope.welcome = 'Enter Your Route';
    $scope.isDriver = false; //We'll ultimately pull this from the cookie
    var startEvents = {
      places_changed: function (searchBox) {
        var loc = searchBox.getPlaces()[0].geometry.location;
        startPoint = [loc.lat(),loc.lng()];
        $scope.submitPoints();
      }
    }
    var endEvents = {
      places_changed: function (searchBox) {
        var loc = searchBox.getPlaces()[0].geometry.location;
        endPoint = [loc.lat(),loc.lng()];
        $scope.submitPoints();
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
      if ($scope.isDriver && routeArray.length){
        DB.postRequest('route',{
          route: routeArray,
          bounds: {} //fill me in!
        });
      }
      else if (startPoint.length && endPoint.length){
        DB.postRequest('endpoints',{
          startPoint: startPoint,
          endPoint: endPoint
        })
      }
      $log.log('post request submitted')
    }

    uiGmapGoogleMapApi.then(function(maps) { 
      uiGmapIsReady.promise().then(function(instance) {
        var map = instance[0].map;
        $scope.submitPoints = function (){
          if ($scope.startMarker instanceof maps.Marker && $scope.startMarker instanceof maps.Marker){
            $scope.startMarker.setMap(null);
            $scope.endMarker.setMap(null);
          }
          if ($scope.renderer instanceof maps.DirectionsRenderer) {
            $scope.renderer.setMap(null);
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
                  renderer.setDirections(result);
                  routeArray = renderer.getDirections().routes[0].overview_path.map(function(coord){
                    return [coord.lat(),coord.lng()]
                  });
              });
            }
            else {
              $scope.startMarker = new maps.Marker({
                    position: new maps.LatLng(startPoint[0],startPoint[1]),
                    map: map,
                    title: 'Start',
                    draggable: false 
              });
              $scope.endMarker = new maps.Marker({
                    position: new maps.LatLng(endPoint[0],endPoint[1]),
                    map: map,
                    title: 'End',
                    draggable: false 
              });
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
