var assert = require('assert');
var expect = require('chai').expect;
var server = require('../server/index.js');
var http = require('http');

var testUser = Math.floor(Math.random()*10000).toString();
var testPass = 'fakepassword'

describe('Server runs', function(){
  it('Should respond to an HTTP GET', function(done){
    var req = http.request({
      port:4000,
      path: '/index.html'
    },function(response){
      if (response.statusCode === 200) done();
    });
    req.end();
  });
});
describe('User Management',function(){
  this.timeout(0);
  beforeEach(function(done){
    setTimeout(function(){done();},1000);
  })
  it ('Should create a user',function(done){
    var req = http.request({
      method: 'POST',
      port: 4000,
      path: '/api/auth/signup',
      headers: {
        'Content-Type': 'application/json'
      }
    }, function(response){
      if (response.statusCode === 200 || response.statusCode === 201) done();
    });
    req.end(JSON.stringify({username:testUser,password:testPass}));
  });
  it ('Should log in as that user',function(done){
    var req=http.request({
      method: 'POST',
      path: '/api/auth/login',
      port: 4000,
      headers: {
        'Content-Type': 'application/json'
      }
    },function(response){
      if (response.statusCode === 200 || response.statusCode === 201) done();
    });
    req.end(JSON.stringify({username:testUser,password:testPass}))
  });
  it ('Should reject bad logins',function(done){
    var req=http.request({
      method: 'POST',
      path: '/api/auth/login',
      port: 4000,
      headers: {
        'Content-Type': 'application/json'
      }
    },function(response){
      if (response.statusCode === 401 || response.statusCode === 500) done();
    });
    req.end(JSON.stringify({username:testUser,password:'wrongpass'}))
  });
  it ('Should delete users', function(done){
    var req=http.request({
      method: 'POST',
      path: '/api/auth/login',
      port: 4000,
      headers: {
        'Content-Type': 'application/json'
      }
    },function(response){
      if (response.statusCode === 200) done();
    });
    req.end(JSON.stringify({username:testUser,password:testPass,deleteUser:true}))
  });
  it ('Should not allow users to log in as deleted users',function(done){
    var req=http.request({
      method: 'POST',
      path: '/api/auth/login',
      port: 4000,
      headers: {
        'Content-Type': 'application/json'
      }
    },function(response){
      if (response.statusCode === 401 || response.statusCode === 404) done();
    });
    req.end(JSON.stringify({username:testUser,password:testPass}))
  });
})
