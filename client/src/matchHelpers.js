var potentials = require('../../server/potentialMatches/potentialMatchesController.js')

angular.module('pegasys.matchHelpers', ['pegasys.services'])
  .factory('matchHelpers', function (DB) {

    var matchHelpers = {};

    matchHelpers.getMatches = function(user){
      // Make a get request and hand info off to compareUsers and compareRoutes
    };

    matchHelpers.filterDriverStatus = function(user, users){
    var options = [];
    var userStatus = user.driver;

    for(var i = 0; i < users.length; i++){
      if(users[i].driver !== userStatus){
        options.push(users[i]);
      }
    }

    return options;
  };

  matchHelpers.compareUsers = function(user, users, callback, range){
    var driver;
    var rider;
    var option;
    // An array of the user's matches
    var userOptions = [];

    for(var i = 0; i < users.length; i++){
      if(user.driver === true){
        driver = user;
        rider = users[i];
        option = rider;
      }else{
        driver = users[i];
        rider = user;
        option = driver;
      }

      var matchedPoints = callback(driver, rider, range);
      if(matchedPoints !== false){
        // Push an object containing the user id and the matched route points
        // optionId = option.id;
        var optionMatch = {};
        optionMatch[option.id] = matchedPoints;
        userOptions.push(optionMatch);
      }
    }

    return userOptions;
  };

  matchHelpers.compareRoutes = function(driver, rider, range){
    var riderStart = rider.startPoint;
    var riderEnd = rider.endPoint;
    var rSMatch = false;
    var route = driver.route;
    var matchingPoints = false;

    for(var i = 0; i < route.length; i++){
      // Check whether the rider's start point has been matched to the route
      var riderPoint;
      var routePoint = route[i];
      if(rSMatch === false){
        riderPoint = riderStart;
      }else{
        riderPoint = riderEnd;
      }

      // Ensure that both lat coordinates are either positive or negative
      if(riderPoint[0] > 0 && routePoint[0] > 0){
        if(Math.abs(riderPoint[0] - routePoint[0]) > range){
          continue;
        }
      }else if(riderPoint[0] < 0 && routePoint[0] < 0){
        if(Math.abs((riderPoint[0] * -1) - routePoint[0]) > range){
          continue;
        }
      }else{
        continue;
      }

      // Ensure that both lng coordinates are either positive or negative
      if(riderPoint[1] > 0 && routePoint[1] > 0){
        if(Math.abs(riderPoint[1] - routePoint[1]) > range){
          continue;
        }
      }else if(riderPoint[1] < 0 && routePoint[1] < 0){
        if(Math.abs(riderPoint[1] - routePoint[1]) > range){
          continue;
        }
      }else{
        continue;
      }
      // If rider start point has not yet been matched, then begin the array
      // of the driver's matched route points
      if(rSMatch === false){
        rSMatch = true;
        matchingPoints = [[routePoint[0], routePoint[1]]];
      // If rider start point has been matched, then add the matched route point
      // to the existing array of driver's matched route points and return that array
      }else{
        matchingPoints.push([routePoint[0], routePoint[1]]);
        return matchingPoints
      }
    }

    // If either the start or end point for the rider has not been matched to the
    // driver's route, then return a false statement
    return false;
    };

    return matchHelpers;

  });
