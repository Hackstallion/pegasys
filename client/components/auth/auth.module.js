'use strict';

angular.module('pegasysApp.auth', [
  'pegasysApp.constants',
  'pegasysApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
