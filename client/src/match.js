angular.module('pegasys.match',[])  
  /*.config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA4Xcj1Zmxjur-7JjJP5imFXy6z7B53rHE',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'geometry'
    });
  })*/
  .controller('MatchController', function($scope,$http,$log, DB, uiGmapGoogleMapApi,uiGmapIsReady,matchHelpers) {
    $scope.header = 'My Matches';
    $scope.user = document.cookie.substr(5);
    $scope.userData = {};
    $scope.matches = [];
    $scope.matchNames = [];
    /*Daniel's addition: a map!*/
    $scope.map = {
      control: {},
      center: {latitude: 30.268995, longitude: -97.740679}, //MakerSquare :)
      zoom: 12
    }
    $scope.showOnMap = function(username){
      $log.log('show on map: '+username)
    }

    $scope.tester = function(){$log.log('testing testing')};

    $scope.requestMatch = function(requestedUsername){
        DB.postRequest('matches/request', {from_id: $scope.user, to_id: requestedUsername})
          .then(function(){$log.log('sent match request')});
    };

    var userData;
    var usersData;
    DB.getRequest('profile')
      .then(function(response){
        $log.log('profile request result', response);
        $scope.userData = userData = response.data;
        DB.getRequest('getusers', userData.username).then(function(response){
          usersData = response.data;
          $log.log('userData', userData);
          $log.log('usersData', usersData);
          $scope.matches = matchHelpers.getMatches(userData, usersData);
          for(var i = 0; i < $scope.matches.length; i++){
            $scope.matchNames.push($scope.matches[i].username);
          }
        })
      });
    /* more map stuff, now*/
    $scope.riderStart = {};
    $scope.riderEnd = {};
    $scope.driverLine = {};
    uiGmapGoogleMapApi.then(function(maps) { 
      uiGmapIsReady.promise().then(function(instance) {
        var map = instance[0].map;
        if ($scope.userData.driver){
          // display the driver's polyline
          var driverRoute = $scope.userData.route.map(function(pair){
            return new maps.LatLng(pair[0],pair[1]);
          });
          var newBounds = new maps.LatLngBounds();
          driverRoute.forEach(function(point){
            newBounds.extend(point);
          });
          map.fitBounds(newBounds);
          var driverLine = new maps.Polyline({
            map: map,
            path: driverRoute,
          });
          // make $scope.showOnMap() show riders' endpoints
          $scope.showOnMap = function(rider){
            var riderData = $scope.matches.filter(function(match){
              return match.username === rider;
            })[0];
            $log.log(riderData);
            riderData.startPoint = riderData.matchedPoints[0];
            riderData.endPoint = riderData.matchedPoints[1];
            if ($scope.riderStart instanceof maps.Marker){
              $scope.riderStart.setPosition(new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]));
              $scope.riderEnd.setPosition(new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]));
            } else {
              $scope.riderStart = new maps.Marker({
                map: map,
                position: new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]),
                draggable: false
              });
              $scope.riderEnd = new maps.Marker({
                map: map,
                position: new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]),
                draggable: false
              });
            }
          }
        } else {
          //display the rider's points
          var riderStart = new maps.Marker({
            map: map,
            position: new maps.LatLng($scope.userData.startPoint[0],$scope.userData.startPoint[1]),
            draggable: false
          });
          var riderEnd = new maps.Marker({
            map: map,
            position: new maps.LatLng($scope.userData.endPoint[0],$scope.userData.endPoint[1]),
            draggable: false
          });
          var newBounds = new maps.LatLngBounds();
          newBounds.extend(riderStart.position);
          newBounds.extend(riderEnd.position);
          map.fitBounds(newBounds);
          //make $scope.showOnMap() show drivers' polylines
          $scope.showOnMap = function(driver){
            var driverData = $scope.matches.filter(function(match){
              return match.username === driver;
            })[0];
            $log.log(driverData);
            if ($scope.driverLine instanceof maps.Polyline){
              $scope.driverLine.setPath(driverData.route.map(function(pair){
                return new maps.LatLng(pair[0],pair[1]);
              }));
            } else {
              $scope.driverLine = new maps.Polyline({
                map: map,
                path: driverData.route.map(function(pair){
                    return new maps.LatLng(pair[0],pair[1]);
                })
              })
            }

            /*
            riderData.startPoint = riderData.matchedPoints[0];
            riderData.endPoint = riderData.matchedPoints[1];
            if ($scope.riderStart instanceof maps.Marker){
              $scope.riderStart.setPosition(new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]));
              $scope.riderEnd.setPosition(new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]));
            } else {
              $scope.riderStart = new maps.Marker({
                map: map,
                position: new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]),
                draggable: false
              });
              $scope.riderEnd = new maps.Marker({
                map: map,
                position: new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]),
                draggable: false
              });
            }*/
          }
        }
      });
    });
  });
