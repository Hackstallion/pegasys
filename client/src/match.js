angular.module('pegasys.match',[])  
  .controller('MatchController', function($scope,$log, $location, DB, uiGmapGoogleMapApi,uiGmapIsReady,matchHelpers,Global) {
    if (!Global.getItem('currentTrip') || !Global.getItem('currentTrip').name) $location.path('/main');
    console.log(Global.getItem('currentTrip').name);
    var tripName = Global.getItem('currentTrip').name;
    $scope.header = 'My Matches';
    $scope.user = document.cookie.substr(5);
    $scope.userData = {};
    $scope.userTrip = {};
    $scope.matches = [];
    $scope.matchNames = [];
    $scope.matchMap = {
      control: {},
      center: {latitude: 30.268995, longitude: -97.740679}, //MakerSquare :)
      zoom: 12
    };

    $scope.showOnMap = function(){};
    //this will get overwritten

    $scope.requestMatch = function(requestedUsername){
        DB.postRequest('matches/request', {from_id: $scope.user, to_id: requestedUsername})
          .then(function(){$log.log('sent match request');});
    };

    var userData;
    var usersData;
    $scope.getMatches = function(tripName){
      return DB.getRequest('profile')
        .then(function(response){
          $scope.userData = userData = response.data;
          $scope.userTrip = userTrip = $.extend(JSON.parse(response.data.trips)[tripName],{username:userData.username});
          DB.getRequest('getusers', userData.username).then(function(response){
            usersData = response.data;
            $scope.matches = matchHelpers.getMatches(userTrip, usersData);
            for(var i = 0; i < $scope.matches.length; i++){
              $scope.matchNames.push($scope.matches[i].username);
            }
          });
        });
    };
    $scope.riderStart = {};
    $scope.riderEnd = {};
    $scope.driverLine = {};
    $scope.driverStart = {};
    $scope.driverEnd = {};
    $scope.getMatches(tripName).then(function(){
      uiGmapGoogleMapApi.then(function(maps) { 
      //uiGmapIsReady is broken when there is more than
      //one map instance, and the one from mapview counts.
      //We're taking it on faith that the map is loaded.
      //This produces an error in the console if 
      //the map is not loaded, but does not crash the app,
      //at least on Chrome.
        var map = $scope.matchMap.control.getGMap();
        var displayEndPoints = function(polyline){
          var path = polyline.getPath().getArray();
          var startPoint = path[0];
          var endPoint = path[path.length-1];
          if ($scope.driverStart instanceof maps.Marker){
            $scope.driverStart.setPosition(startPoint);
            $scope.driverEnd.setPosition(endPoint);
          } else {
            $scope.driverStart = new maps.Marker({
              map: map,
              position: startPoint,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              draggable: false
            });
            $scope.driverEnd = new maps.Marker({
              map: map,
              position: endPoint,
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              draggable: false
            });
            console.log('where are my endpoints?');
          }
        };
        if (Global.getItem('currentTrip').driver){
          // display the driver's polyline
          var driverRoute = $scope.userTrip.route.map(function(pair){
            return new maps.LatLng(pair[0],pair[1]);
          });
          var newBounds = new maps.LatLngBounds();
          newBounds.extend(driverRoute[0]);
          newBounds.extend(driverRoute[driverRoute.length-1]);
          map.fitBounds(newBounds);
          var driverLine = new maps.Polyline({
            map: map,
            path: driverRoute,
            strokeColor: '#b32400',
            strokeWeight: 8,
            strokeOpacity: 0.5
          });
          displayEndPoints(driverLine);
          // make $scope.showOnMap() show riders' endpoints
          $scope.showOnMap = function(trip){
            var riderData = $scope.matches.filter(function(match){
              return match.tripName === trip;
            })[0];
            riderData.startPoint = riderData.startPoint;
            riderData.endPoint = riderData.endPoint;
            if ($scope.riderStart instanceof maps.Marker){
              $scope.riderStart.setPosition(new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]));
              $scope.riderEnd.setPosition(new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]));
            } else {
              $scope.riderStart = new maps.Marker({
                map: map,
                position: new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]),
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                draggable: false
              });
              $scope.riderEnd = new maps.Marker({
                map: map,
                position: new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]),
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                draggable: false
              });
            }
          };
        } else {
          //display the rider's points
          var riderStart = new maps.Marker({
            map: map,
            position: new maps.LatLng($scope.userTrip.startPoint[0],$scope.userTrip.startPoint[1]),
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            draggable: false
          });
          var riderEnd = new maps.Marker({
            map: map,
            position: new maps.LatLng($scope.userTrip.endPoint[0],$scope.userTrip.endPoint[1]),
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            draggable: false
          });
          newBounds = new maps.LatLngBounds();
          newBounds.extend(riderStart.position);
          newBounds.extend(riderEnd.position);
          map.fitBounds(newBounds);
          //make $scope.showOnMap() show drivers' polylines
          $scope.showOnMap = function(trip){
            var driverData = $scope.matches.filter(function(match){
              return match.tripName === trip;
            })[0];
            // $log.log(driverData);
            if ($scope.driverLine instanceof maps.Polyline){
              $scope.driverLine.setPath(driverData.route.map(function(pair){
                return new maps.LatLng(pair[0],pair[1]);
              }));
            } else {
              $scope.driverLine = new maps.Polyline({
                map: map,
                path: driverData.route.map(function(pair){
                  return new maps.LatLng(pair[0],pair[1]);
                }),
                strokeColor: '#b32400',
                strokeWeight: 8,
                strokeOpacity: 0.5
              });
              displayEndPoints($scope.driverLine);
            }
            var newBounds = new maps.LatLngBounds();
            newBounds.extend(new maps.LatLng(driverData.route[0][0],driverData.route[0][1]));
            newBounds.extend(new maps.LatLng(driverData.route[driverData.route.length-1][0],driverData.route[driverData.route.length-1][1]));
            map.fitBounds(newBounds);
          }
        }
      });
    });
  });
