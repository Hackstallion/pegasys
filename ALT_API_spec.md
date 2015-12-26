All API calls should return JSON

POST /api/login => log in, redirect to signup if account doesn't exist.
                   Redirect to route selection page. Default to rider.
                   PHASE 1: handle log in with a cookies.


                   body: {
                          username: 'username',
                          password: 'password'
                         }
                          

POST /api/signup => if username doesn't exist, add user to the databse.
                   else return 500 err & redirect to login.

                   body: {
                          username: 'username',
                          password: 'password',
                         }

POST /api/createTrip => set driver status, set start and end points.
                      requires user to be logged in.
                   
                   body: {
                          driver : boolean,
                          startPoint : [lat,long],
                          endPoint : [lat,long]
                         }

GET /api/switch => switch user.driver to the opposite. Requires login.

POST /api/route => add route array (array of many arrays)
                   and route bounds (array of 4 arrays). Requires user to be logged in.

                   body : {route:[[lat,long],[lat,long]...]
                           bounds: [[lat,long],[lat,long],[lat,long],[lat,long]] }

GET /api/potentials => send array of all user objects where driver is of the oposite value as the user's and matched = 0.
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
