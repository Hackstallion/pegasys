angular.module('pegasys.main',[])
  .controller('MainController', function($scope, $location, $log, $timeout, uiGmapGoogleMapApi, uiGmapIsReady, DB, Main, Global) {
    if (!document.cookie.includes('user')) $location.path('/login');
  	// $scope.welcome = 'Pegasys Commute Sharing';
    $scope.welcome = 'Trips';
    $scope.trips = [];
    $scope.messageCount = 0;

    $scope.currTripIndex;
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

    $scope.showMap = function(){$log.log('first showMap')};
    //this will get overwritten

    $scope.init = function(){
      var userTrip;
      return DB.getRequest('profile')
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
                $scope.trips.push(userTrip);
               
              }

            })
    };

    // Run init
    


    $scope.getMatches = function(tripName,tripDriver){
      Global.setItem('currentTrip',{name: tripName, driver: tripDriver==='driver' ? true : false});
      $location.path('/match');
    }

    $scope.init().then(
    uiGmapGoogleMapApi.then(function(maps) { 
      //uiGmapIsReady is broken when there is more than
      //one map instance, and the one from mapview counts.
      //We're taking it on faith that the map is loaded.
      //This produces an error in the console if 
      //the map is not loaded, but does not crash the app,
      //at least on Chrome.
      $log.log('maps: ', maps);
     
      var map = $scope.map.control.getGMap();
      // var map = $scope.map.events = {
      //   tilesloaded: function (map) {
      //           $scope.$apply(function () {
      //               $scope.mapInstance = map;           
      //           });
      //       }
      // }
      $scope.showMap = function(tripIndex){
          $log.log('starting showMap with index: ', tripIndex);
          if($scope.trips[tripIndex].driver){
            var driverData = $scope.trips[tripIndex];
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
          }else{
            riderData = $scope.trips[tripIndex];
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
          }
          // Append map to appropriate DOM element
          if($scope.currTripIndex !== undefined){
            angular.element(document).find('.userMap').remove();
          }
          angular.element(document).find('trip_' + tripIndex).append("<ui-gmap-google-map class='userMap' center='center' zoom='trip.tripMap.zoom' control='trip.tripMap.control'> </ui-gmap-google-map>");
          // // Keep track of last index used
          $scope.currTripIndex = tripIndex;
        }
    }));
      // End of uimap call

        

        

    

    $scope.addMap = function(tripName){
      var userTrip = $scope.trips[tripName];
      userTrip = new Map(userTrip);
      $scope.currentMap = tripName;
      $log.log('$scope.trips[tripName]', $scope.trips[tripName]);
    }

    $scope.tester = function(){
      $log.log('test, test');
    }
    $scope.tester();

  });
