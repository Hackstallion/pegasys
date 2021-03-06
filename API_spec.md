
POST /api/auth/signup => If username doesn't exist, adds user to the database
                         otherwise returns 401 error and a message that the user already exists.
                         Set cookie.

                   body: {
                          username: 'username',
                          password: 'password'
                         }

POST /api/auth/login => Log in, if account doesn't exist then notify user.
                        Redirect to main page.
                        Set cookie. Deletes user if deleteUser = true.

                   body: {
                          deleteUser: Boolean, (optional)
                          username: 'username',
                          password: 'password'
                         }

GET /api/auth/signout => Sign out by clearing cookies 'user' attribute.

POST /api/createtrip => Set driver status, set start and end points, route, bounds, and other
                        trip-related info. Creates a new trip if one by given tripName doesn't yet 
                        exist, otherwise it updates that trip in the database. 
                        Adding a "remove" key with a truthy value will delete the trip associated 
                        with the given tripName in the database.
                        Requires user to be logged in.
                   
                   body: { 
                          tripName: {
                                      remove: Boolean, (optional)
                                      driver : Boolean,
                                      startPoint : [lat,long],
                                      endPoint : [lat,long],
                                      startAddress: (Google Maps geocoded address, or null),
                                      endAddress: (Google Maps geocoded address, or null),
                                      route:[[lat,long],[lat,long]...],
                                      bounds: [[lat,long],[lat,long],[lat,long],[lat,long]],
                                      etc.: etc.
                                    }
                         }

GET /api/getusers => Send array of all user objects besides the requesting user's. Passwords, 
                     matchRequests, and message mailboxes are set to null before being sent.
                     Requires login.
                     PHASE 2 proposition: Filter by trip time matching.

                   response body : [{user1},{user2}...]

POST /api/profile => Update user's password. Requires user to be logged in.

                   body: { password: 'password' }

GET /api/profile => Return user's profile object except for password. Must be logged in.

                   response body: {
                                   username: 'username',
                                   matchRequests: [...],
                                   trips: '{}',
                                   inbox: [...],
                                   sent: [...]
                                  }

POST /api/matches/request => Add the username denoted by from_id to the matchRequests array of the user
                             denoted by to_id. The former must be logged in. (Not currently used by client.)

                   body: {
                          from_id: 'username',
                          to_id: 'username'
                         }

POST /api/matches/accept => Splices the requestor's username out of the acceptor's matchRequests array.
                            The latter must be logged in. (Not currently used by client.)
                   body: {
                          from_id: 'username',
                          to_id: 'username'
                         }

GET /api/messages/getinbox => Return all messages in requesting user's inbox. 
                              Must be logged in.

                   response body: [{message},{message}...]

GET /api/messages/getsent => Return all messages in requesting user's sent mailbox.
                             Must be logged in.

                   response body: [{message},{message}...]

POST /api/messages/send => Add a message to another user's inbox and requesting user's sent box. 
                           Must be logged in.

                   body: {
                          from_id: 'username',
                          to_id: 'username',
                          text: string (must not be blank)
                         }

POST /api/messages/delete => Can be used by sender (from_id) or recipient (to_id) to remove a message 
                             from both the sender's sent mailbox and the recipient's inbox. Either sender or recipient must be logged in.

                   body: {
                          from_id: 'username',
                          to_id: 'username',
                          text: string (must not be blank)
                         }


