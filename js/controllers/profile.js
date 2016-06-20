'use strict';

angular.module('BlogApp').controller('ProfileController', function($log, $mdToast, API) {
  $log.debug('ProfileController Activated.');
  var $ctrl = this;
  $ctrl.profile = API.getProfile();
  var curDate = new Date();

  $ctrl.maxDate = new Date(
    curDate.getFullYear() - 3,
    curDate.getMonth(),
    curDate.getDate()
  );
  $ctrl.minDate = new Date(
    curDate.getFullYear() - 150,
    curDate.getMonth(),
    curDate.getDate()
  );

  $ctrl.calcAge = function(date) {
    var birthday = +new Date(date);
    $ctrl.profile.age = ~~((Date.now() - birthday) / (31557600000));
  };

  $ctrl.save = function() {
    API.saveProfile($ctrl.profile);
    $mdToast.show($mdToast.simple().textContent('Your profile was successfully saved!').position('top right').theme('success-toast'));
  };
});
