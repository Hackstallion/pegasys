module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        force: true
      },
      client: {
        src: ['client/services/*.js','client/src/*.js','client/app.js']
      }
    },
    mochaTest: {
      test: 'spec/serverSpec.js'
    },
    concat: {
      client: {
        src: [
        'client/bower_components/lodash/lodash.min.js',
        'client/bower_components/jquery/dist/jquery.min.js',
        'client/bower_components/angular/angular.min.js',
        'client/bower_components/angular-route/angular-route.min.js',
        'client/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
        'client/bower_components/angular-google-maps/dist/angular-google-maps.min.js',
        'client/src/main.js',
        'client/src/login.js',
        'client/src/signup.js',
        'client/src/mapview.js',
        'client/src/profile.js',
        'client/src/match.js',
        'client/src/mailbox.js',
        'client/src/matchHelpers.js',
        'client/services/services.js',
        'client/app.js'
        ],
        dest: 'client/dist/concat/pegasys.js'
      }
    },
    uglify: {
      options: {
        screwIE8: true,
        mangle: false
      },
      build: {
        src: 'client/dist/concat/pegasys.js',
        dest: 'client/dist/pegasys.min.js'
      }
    },
  });  

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint','mochaTest','concat','uglify']);
  grunt.registerTask('lint', ['jshint']);


};