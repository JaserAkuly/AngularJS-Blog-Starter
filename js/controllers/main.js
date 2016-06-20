'use strict';

angular.module('BlogApp').controller('MainController', function($log, API) {
  $log.debug('MainController Activated.');
  var $ctrl = this;
  $ctrl.posts = API.getAllPosts();
});
