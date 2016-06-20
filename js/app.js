'use strict';

var app = angular.module('BlogApp', [
  'ngAria',
  'ngAnimate',
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'LocalStorageModule',
  'mdPickers'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        root: {
          templateUrl: 'partials/layout.tpl.html'
        }
      }
    })
    .state('app.main', {
      url: '/',
      views: {
        content: {
          templateUrl: 'partials/main.tpl.html',
          controller: 'MainController',
          controllerAs: '$ctrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        content: {
          templateUrl: 'partials/profile.tpl.html',
          controller: 'ProfileController',
          controllerAs: '$ctrl'
        }
      }
    })
    .state('app.post', {
      url: '/post/:id',
      views: {
        content: {
          templateUrl: 'partials/post.tpl.html',
          controller: 'PostController',
          controllerAs: '$ctrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
});

app.run(function($log) {
  $log.debug('Application Initialized.');
});
