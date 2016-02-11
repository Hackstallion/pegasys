# Pegasys Rideshare

A carpool-facilitating rideshare app:

* Allows users to find other people to share car rides with as a driver and/or a rider depending on which one they prefer to be on a given trip.
* Google Maps integrated for the most reliable route-matching.
* Distance calculations between driver and rider coordinates are made using the haversine formula. 
* Built-in messaging functionality for coordination among users.
* User profile and trip details saved in password-protected database for optimal matching with other users (profile and trip details may be edited or deleted).

## Latest Version

The app is ready for phase 1 deployment. Phase 2 and later deployments may add additional security layers, expanded testing suite, design upgrades, and/or UX features not implemented in the first release candidate.

## Documentation

The app is live on Heroku here: [https://pegasys-rideshare.herokuapp.com](https://pegasys-rideshare.herokuapp.com/) (subject to daily limits of free usage of the Google Maps API key).

See [API_spec.md](https://github.com/pegasys-rideshare/pegasys/blob/master/API_spec.md) for API POST and GET routes.

Pegasys utilizes the MEAN stack and relies on the Google Maps API, as well as the [angular-google-maps project](https://angular-ui.github.io/angular-google-maps/#!/). Note that the angular-google-maps project is under active development, and we've implemented workarounds for bugs and missing features.

## Installation

From the master branch: after cloning down the repo, run "npm install" from the parent directory and "bower install" from the ./client directory in the command line to install project dependencies. Before starting the server, run "grunt" command from the parent directory in order to concatenate and minify source files or the app will not work on the client side. Then run "nodemon" command in another command line window from the parent directory to start the server. To use the Google Maps API, you must have your own API key (available for free from Google). Input your API key in ./client/src/APIKey.example.js and change the filename as indicated in the comments of that file.

## Licensing

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a></br>Except where otherwise noted, content from this app is licensed under a Creative Commons Attribution 4.0 International license.

## Contacts

The authors may be contacted by email:</br>
Ivan Mora ([moraivan1@gmail.com](mailto:moraivan1@gmail.com)), Daniel Sato ([dksato@gmail.com](mailto:dksato@gmail.com)), Salman Oskooi ([soskooi@gmail.com](mailto:soskooi@gmail.com)), Mac Evans ([maclean.evans@gmail.com](mailto:maclean.evans@gmail.com))
