angular.module('pegasys.mapview',['uiGmapgoogle-maps'])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA4Xcj1Zmxjur-7JjJP5imFXy6z7B53rHE',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'places,geometry'
    });
  })
  .controller('MapviewController', function($log,$scope,Mapview,uiGmapGoogleMapApi) {
      var startPoint = [];
      var endPoint = [];
      var startEvents = {
        places_changed: function (searchBox) {
          var loc = searchBox.getPlaces()[0].geometry.location;
          startPoint = [loc.lat(),loc.lng()];
        }
      }
      var endEvents = {
        places_changed: function (searchBox) {
          var loc = searchBox.getPlaces()[0].geometry.location;
          endPoint = [loc.lat(),loc.lng()];
        }
      }
      $scope.startSearchBox = {events:startEvents,template:'startSearchBox.tpl.html'}
      $scope.endSearchBox = {events:endEvents,template:'endSearchBox.tpl.html'}

      $scope.isDriver = true; //We'll ultimately pull this from the cookie
      $scope.welcome = 'Enter Your Route';

      $scope.map = {
        center: {latitude: 30.2932637, longitude: -97.7571322},
        zoom: 10
      }

   // });

    /*$scope.initMap = function(){
      map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.2932637, lng: -97.7571322},
      zoom: 10
    });
    var startPosition = new google.maps.LatLng(30.3564111,-97.7404042);
    var endPosition = new google.maps.LatLng(30.2689996,-97.7428731);
    var service = new google.maps.DirectionsService();
    var renderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map: map
    });
    service.route({
      origin: startPosition,
      destination: endPosition,
      travelMode: 'DRIVING'
      },function(result){
        renderer.setDirections(result);
    });
    }*/
  });
