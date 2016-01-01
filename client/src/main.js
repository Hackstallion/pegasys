angular.module('pegasys.main',[])
  .controller('MainController', function($scope, $location, $log, DB, Main, Global) {
    if (!document.cookie.includes('user')) $location.path('/login');
  	// $scope.welcome = 'Pegasys Commute Sharing';
    $scope.welcome = 'Trips';
    $scope.trips = [];
    $scope.messageCount = 0;

    $scope.init();


    $scope.init = function(){
      var userTrip;
      DB.getRequest('profile')
            .then(function(response){
              // $log.log(response);
              var user = response.data;
              var trips = JSON.parse(user.trips);
              for(trip in trips){
                var currTrip = trips[trip];
                userTrip = {
                  tripName: trip,
                  startPoint: currTrip.startPoint,
                  endPoint: currTrip.endPoint
                };
                if(currTrip.driver){
                  userTrip.driver = 'driver';
                }else{
                  userTrip.driver = 'rider'
                }

                if(currTrip.matched === [] || !currTrip.matched){
                  var optionType = 'driver';
                  if(currTrip.driver){
                    optionType = 'rider';
                  }
                  userTrip.matched = 'You do not have a ' + optionType + ' for this trip'
                }else{
                  userTrip.matched = '';
                  for(var i = 0; i < currTrip.matched.length; i++){
                    userTrip.matched += userTrip.matched = 'Your ' + optionType + ' for this trip is ' + currTrip.matched + '\n';
                  }
                }

                // Add trip map info
                userTrip.map = {
                  control: {},
                  center: {latitude: 30.268995, longitude: -97.740679}, //MakerSquare :)
                  zoom: 12
                };
                userTrip.mapData = {};
                userTrip.mapData.riderStart = {};
                userTrip.mapData.riderEnd = {};
                userTrip.mapData.driverLine = {};
                userTrip.mapData.driverStart = {};
                userTrip.mapData.driverEnd = {};

                $scope.trips.push(userTrip);
              }
            })
    }

    $scope.getMatches = function(tripName,tripDriver){
      Global.setItem('currentTrip',{name: tripName, driver: tripDriver==='driver' ? true : false});
      $location.path('/match');
    }

    // A method that takes in a tripName and uses its mapData in $scope.trips to generate a map
    $scope.Map = function(userTrip){
      // Adds all other trip data to the object so that the map can reference it.
      this.tripData = userTrip
      this.tripMap = {
        control: {},
        center: {latitude: 30.268995, longitude: -97.740679}, //MakerSquare :)
        zoom: 12
      };
      this.riderStart = {};
      this.riderEnd = {};
      this.driverLine = {};
      this.driverStart = {};
      this.driverEnd = {};

      uiGmapGoogleMapApi.then(function(maps) { 
      //uiGmapIsReady is broken when there is more than
      //one map instance, and the one from mapview counts.
      //We're taking it on faith that the map is loaded.
      //This produces an error in the console if 
      //the map is not loaded, but does not crash the app,
      //at least on Chrome.
        var map = this.tripMap.control.getGMap();
        var displayEndPoints = function(polyline){
          var path = polyline.getPath().getArray();
          var startPoint = path[0];
          var endPoint = path[path.length-1];
          if (this.driverStart instanceof maps.Marker){
            this.driverStart.setPosition(startPoint);
            this.driverEnd.setPosition(endPoint);
          } else {
            this.driverStart = new maps.Marker({
              map: map,
              position: startPoint,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              draggable: false
            });
            this.driverEnd = new maps.Marker({
              map: map,
              position: endPoint,
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              draggable: false
            });
            console.log('where are my endpoints?')
          }
        }
        if (Global.getItem('currentTrip').driver){
          // display the driver's polyline
          var driverRoute = this.tripData.route.map(function(pair){
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
          // // make $scope.showOnMap() show riders' endpoints
          // $scope.showOnMap = function(trip){
          //   var riderData = $scope.matches.filter(function(match){
          //     return match.tripName === trip;
          //   })[0];
          //   riderData.startPoint = riderData.startPoint;
          //   riderData.endPoint = riderData.endPoint;
          //   if ($scope.riderStart instanceof maps.Marker){
          //     $scope.riderStart.setPosition(new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]));
          //     $scope.riderEnd.setPosition(new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]));
          //   } else {
          //     $scope.riderStart = new maps.Marker({
          //       map: map,
          //       position: new maps.LatLng(riderData.startPoint[0],riderData.startPoint[1]),
          //       icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          //       draggable: false
          //     });
          //     $scope.riderEnd = new maps.Marker({
          //       map: map,
          //       position: new maps.LatLng(riderData.endPoint[0],riderData.endPoint[1]),
          //       icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          //       draggable: false
          //     });
          //   }
          // }
        } else {
          //display the rider's points
          var riderStart = new maps.Marker({
            map: map,
            position: new maps.LatLng(this.tripData.startPoint[0],this.tripData.startPoint[1]),
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            draggable: false
          });
          var riderEnd = new maps.Marker({
            map: map,
            position: new maps.LatLng(this.tripData.endPoint[0],this.tripData.endPoint[1]),
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            draggable: false
          });
          var newBounds = new maps.LatLngBounds();
          newBounds.extend(riderStart.position);
          newBounds.extend(riderEnd.position);
          map.fitBounds(newBounds);
          // //make $scope.showOnMap() show drivers' polylines
          // $scope.showOnMap = function(trip){
          //   var driverData = $scope.matches.filter(function(match){
          //     return match.tripName === trip;
          //   })[0];
          //   // $log.log(driverData);
          //   if ($scope.driverLine instanceof maps.Polyline){
          //     $scope.driverLine.setPath(driverData.route.map(function(pair){
          //       return new maps.LatLng(pair[0],pair[1]);
          //     }));
          //   } else {
          //     $scope.driverLine = new maps.Polyline({
          //       map: map,
          //       path: driverData.route.map(function(pair){
          //         return new maps.LatLng(pair[0],pair[1]);
          //       }),
          //       strokeColor: '#b32400',
          //       strokeWeight: 8,
          //       strokeOpacity: 0.5
          //     });
          //     displayEndPoints($scope.driverLine);
          //   }
          //   var newBounds = new maps.LatLngBounds();
          //   newBounds.extend(new maps.LatLng(driverData.route[0][0],driverData.route[0][1]));
          //   newBounds.extend(new maps.LatLng(driverData.route[driverData.route.length-1][0],driverData.route[driverData.route.length-1][1]));
          //   map.fitBounds(newBounds);
          // }
        }
      });


  });
