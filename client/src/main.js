angular.module('pegasys.main',[])
  .controller('MainController', function($scope, $location, $log, DB, Main, Global,uiGmapGoogleMapApi) {
    if (!document.cookie.includes('user')) $location.path('/login');
  	// if the user cookie isn't set, redirect them to the login
    $scope.welcome = 'Trips';
    $scope.trips = [];
    $scope.emptyTripsMessage = false;
    $scope.messageCount = 0;
    $scope.map = {
      control: {},
      center: {latitude: 30.268995, longitude: -97.740679}, //MakerSquare :)
      zoom: 12,
   };
    $scope.riderStart = {};
    $scope.riderEnd = {};
    $scope.driverLine = {};
    $scope.driverStart = {};
    $scope.driverEnd = {};


    $scope.init = function(){
      //get all of a user's trips and format them for display
      var userTrip;
      return DB.getRequest('profile')
            .then(function(response){
              // $log.log(response);
              var user = response.data;
              var trips = JSON.parse(user.trips);
              for(var trip in trips){
                var currTrip = trips[trip];
                userTrip = {
                  tripName: trip,
                  startPoint: currTrip.startPoint,
                  endPoint: currTrip.endPoint,
                  startAddress: currTrip.startAddress,
                  endAddress: currTrip.endAddress,
                  route: currTrip.route
                };
                if(currTrip.driver){
                  userTrip.driver = 'driver';
                }else{
                  userTrip.driver = 'rider';
                }
                var optionType = 'driver';
                if(currTrip.matched === [] || !currTrip.matched){
                  if(currTrip.driver){
                    optionType = 'rider';
                  }
                  userTrip.matched = 'You do not have a ' + optionType + ' for this trip';
                }else{
                  userTrip.matched += userTrip.matched = 'Your ' + optionType + ' for this trip is ' + currTrip.matched + '\n';
                }
                $scope.trips.push(userTrip);
              }
              // Display 'empty trips message' if there are not trips for user
              if($scope.trips[0] === undefined){
                $scope.emptyTripsMessage = true;
              }
            })
    }

    $scope.getMatches = function(tripName,tripDriver){
      //redirects to the match page for a given trip.
      Global.setItem('currentTrip',{name: tripName, driver: tripDriver==='driver' ? true : false});
      $location.path('/match');
    };

    $scope.deleteTrip = function(tripIndex){
      var toDelete = {};
      toDelete[$scope.trips[tripIndex].tripName] = {remove: true};
      DB.postRequest('createtrip', toDelete)
      .then(function(){
        $scope.trips = [];
        $scope.init();
      })
    };

    $scope.createTrip = function(){
      $location.path('/mapview');
    };

    $scope.init().then(function(){
    uiGmapGoogleMapApi.then(function(maps) { 
      $scope.showMap = function(tripIndex){
        var displayEndPoints = function(){
          //displays the endpoints for the given trip
          var startPoint = new maps.LatLng($scope.trips[tripIndex].startPoint[0],
            $scope.trips[tripIndex].startPoint[1]);
          var endPoint = new maps.LatLng($scope.trips[tripIndex].endPoint[0],
            $scope.trips[tripIndex].endPoint[1]);
          if ($scope.driverStart instanceof maps.Marker){
            //if the markers already exist on the map, just move them
            $scope.driverStart.setPosition(startPoint);
            $scope.driverEnd.setPosition(endPoint);
          } else {
            //otherwise, make them from scratch.
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
          }
        }
        var map = $scope.map.control.getGMap();
        //this is a hack to account for the brokenness of uiGmapIsReady().
        var newBounds = new maps.LatLngBounds();
        //this is for recentering and rescaling the map
        if($scope.trips[tripIndex].driver === 'driver'){
          var driverData = $scope.trips[tripIndex];
          if ($scope.riderStart instanceof maps.Marker){
            //if there are rider endpoints, delete them
            $scope.riderStart.setMap(null);
            $scope.riderStart = {};
            $scope.riderEnd.setMap(null);
            $scope.riderEnd = {};
          }
          if ($scope.driverLine instanceof maps.Polyline){
            //if the driver line exists, just reroute it
            $scope.driverLine.setPath(driverData.route.map(function(pair){
              return new maps.LatLng(pair[0],pair[1]);
            }));
          } else {
            //otherwise, create it.
            $scope.driverLine = new maps.Polyline({
              map: map,
              path: driverData.route.map(function(pair){
                return new maps.LatLng(pair[0],pair[1]);
              }),
              strokeColor: '#b32400',
              strokeWeight: 8,
              strokeOpacity: 0.5
            });
          }
          displayEndPoints();
          //rescale and recenter
          newBounds = new maps.LatLngBounds();
          newBounds.extend(new maps.LatLng(driverData.route[0][0],driverData.route[0][1]));
          newBounds.extend(new maps.LatLng(driverData.route[driverData.route.length-1][0],driverData.route[driverData.route.length-1][1]));
          map.fitBounds(newBounds);
        }else{
          //same deal, but for a trip where the user is a rider
          riderData = $scope.trips[tripIndex];
          riderData.startPoint = riderData.startPoint;
          riderData.endPoint = riderData.endPoint;
          if ($scope.driverLine instanceof maps.Polyline){
            $scope.driverLine.setMap(null);
            $scope.driverLine = {};
            $scope.driverStart.setMap(null);
            $scope.driverStart = {};
            $scope.driverEnd.setMap(null);
            $scope.driverEnd = {};
          }
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
          newBounds = new maps.LatLngBounds();
          newBounds.extend($scope.riderStart.position);
          newBounds.extend($scope.riderEnd.position);
          map.fitBounds(newBounds);
        }
        $scope.currTripIndex = tripIndex;
      }
    });});
  });
