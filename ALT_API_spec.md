All API calls should return JSON.

POST /api/auth/signup => If username doesn't exist, add user to the database.
                   else return 500 err & redirect to login.

                   body: {
                          username: 'username',
                          password: 'password'
                         }

POST /api/auth/login => Log in, if account doesn't exist then notify user.
                   Redirect to main page. Default to rider.
                   PHASE 1: handle login with a cookies.

                   body: {
                          username: 'username',
                          password: 'password'
                         }

GET /api/auth/signout => Sign out by clearing cookies 'user' attribute.

POST /api/createtrip/newtrip => Set driver status, set start and end points, route, bounds, and other
                      trip-related info.
                      Requires user to be logged in.
                   
                   body: {
                          driver : Boolean,
                          startPoint : [lat,long],  (if driver === false)
                          endPoint : [lat,long],  (if driver === false)
                          route:[[lat,long],[lat,long]...] (if driver === true)
                         }

POST /api/createtrip/deltrip => Set driver status, set start and end points.
                      requires user to be logged in.
                   
                   body: {
                          driver : boolean,
                          startPoint : [lat,long],
                          endPoint : [lat,long]
                          route:[[lat,long],[lat,long]...] (if driver === true)
                          bounds: [[lat,long],[lat,long],[lat,long],[lat,long]] } (if driver === true)
                         }

GET /api/users => send array of all user objects where driver is of the oposite value as the user's and matched = 0.
Requires login
                     matched = 0
                     PHASE 2: filter drivers based on rider's start/end points
                     and driver's route bounds to save time on client side.
                     PHASE 3: filter based on profile matching.

                     response body : [{user1},{user2}...]

POST /api/profile => update user's profile. Requires user to be logged in,
                     and we need to check whether they're a rider or a driver.
                     PHASE 1: do this with a cookie.

                     body: {profile object}

GET /api/profile => return user's profile object and whether they are a driver. Must be logged in.

                    body: {driver: boolean,
                           profile: {},
                           matchRequests: [int,int...],
                           mailbox: ['string1','string2'..:]}

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
