All API calls should return JSON

POST /api/login => log in as rider or driver, redirect to signup if account doesn't exist.
                   Redirect to route selection page. Default to rider.
                   PHASE 1: handle log in and driver vs rider with a cookies.


                   body: {driver: boolean (optional),
                          username: 'username',
                          password: 'password'}

POST /api/signup => if username doesn't exist, add user to the databse.
                   else return 500 err & redirect to login.

                   body: {driver: boolean(optional),
                          username: 'username',
                          password: 'password',
                         }

GET /api/switch => switch user.driver to the opposite. Requires login.

POST /api/endpoints => set user obect to rider in database, and add start and end points.
                       requires user to be logged in.

                   body: {startPoint: [lat,long],
                          endPoint: [lat,long]}

POST /api/route => set user object to driver in database and add route array (array of many arrays)
                   and route bounds (array of 4 arrays). Requires user to be logged in.

                   body : {route:[[lat,long],[lat,long]...]
                           bounds: [[lat,long],[lat,long],[lat,long],[lat,long]] }

GET /api/drivers => send array of all user objects where driver = true and
                     matched = 0. Omit startPoint and endPoint if set.
                     Requires rider to be logged in.
                     PHASE 2: filter drivers based on rider's start/end points
                     and driver's route bounds to save time on client side.
                     PHASE 3: filter based on profile matching.

                     response body : [{user1},{user2}...]

POST /api/profile => update user's profile. Requires user to be logged in,
                     and we need to check whether they're a rider or a driver.
                     PHASE 1: do this with a cookie.

                     body: {profile object}

GET /api/profile => return user's profile object. Must be logged in.

POST /api/match => If user is a rider : add rider.id to driver.matchRequests.
                   If user is a driver : remove rider.id from driver.matchRequests,
                   set rider.matched to driver.id and driver.matched to rider.id.
                   Either: if unmatch is set, set both users' .matched to 0.

                   body: {unmatch: boolean (optional),
                         from_id: integer,
                         to_id: integer}

POST /api/message => Add a string to another user's mailbox. Must be logged in.

                   body: {from_id: integer,
                          to_id: integer,
                          text: string (must not be blank)}

user {
  id : integer > 1,
  driver: boolean (default 0)
  matched: integer (default 0)
  username: string,
  password: string/hash,
  startPoint : array [lat,long] (may be blank),
  endPoint : array [lat,long] (may be blank),
  route : array [[lat,long],[lat,long]....] (may be blank),
  bounds : array [[lat,long],[lat,long]...],
  matchRequests : [int,int...],
  profile : {profile as described below},
  mailbox : ['string1','string2'...]
}

profile {
  startTime: number (may be blank),
  endTime : number (may be blank),
}
