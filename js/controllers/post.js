'use strict';

angular.module('BlogApp').controller('PostController', function($log, $state, $stateParams, $mdToast, $mdpTimePicker, API) {
  $log.debug('PostController Activated.');
  var $ctrl = this;
  $ctrl.isNew = !$stateParams.id;
  $ctrl.post = API.getPost($stateParams.id);
  $ctrl.maxDate = new Date();

  if(!$ctrl.post.date) {
    $ctrl.post.date = $ctrl.maxDate;
  }

  if(!$ctrl.post.time) {
    $ctrl.post.time = new Date(Math.round($ctrl.maxDate / 60000) * 60000);
  }

  $ctrl.checkIfFuture = function() {
    if($ctrl.post.date && $ctrl.post.time) {
      var d = moment($ctrl.post.date);
      var t = moment($ctrl.post.time);
      var dt = moment(d.format('MM/DD/YYYY') + ' ' + t.format('HH:mm A'), 'MM/DD/YYYY HH:mm A');
      $ctrl.postForm.time.$setValidity('timeTooMuch', dt.isBefore(moment()));
    }
    else {
      $ctrl.postForm.time.$setValidity('timeTooMuch', false);
    }
  };

  $ctrl.timeChanged = function() {
    $ctrl.postForm.time.$setValidity('timeInvalid', moment($ctrl.post.time, 'HH:mm A').isValid());
    $ctrl.checkIfFuture();
  };

  $ctrl.save = function() {
    var message = 'Your post was successfully created!';
    if(!$ctrl.isNew) {
      message = 'Your post "' + $ctrl.post.title + '" was successfully updated!';
    }
    API.savePost($ctrl.post);
    $mdToast.show($mdToast.simple().textContent(message).position('top right').theme('success-toast'));
    $state.go('app.main');
  };
});
