'use strict';

angular.module('BlogApp').service('API', function($log, localStorageService) {
  $log.debug('API Service Created.');
  var API = { };

  API.getProfile = function() {
    var profile = localStorageService.get('profile') || {
      name: '',
      age: 0,
      email: '',
      dob: ''
    };
    if(profile.dob) {
      profile.dob = new Date(profile.dob);
    }
    return profile;
  };

  API.saveProfile = function(data) {
    return localStorageService.set('profile', data);
  };

  API.getAllPosts = function() {
    var posts = localStorageService.get('posts') || [ ];
    return posts.map(function(e) {
      var d = moment(e.date);
      var t = moment(e.time);
      e.dateTime = moment(d.format('MM/DD/YYYY') + ' ' + t.format('HH:mm A'), 'MM/DD/YYYY HH:mm A').toDate();
      return e;
    });
  };

  API.getPost = function(id) {
    var posts = localStorageService.get('posts') || [ ];
    var post = posts.reduce(function(prev, cur) {
      prev[cur.id] = cur;
      return prev;
    }, { });
    var res = post[id] || {
      title: '',
      description: '',
      date: '',
      time: ''
    };
    if(res.date) {
      res.date = new Date(res.date);
    }
    if(res.time) {
      res.time = new Date(res.time);
    }
    return res;
  };

  API.savePost = function(data) {
    var posts = localStorageService.get('posts') || [ ];
    if(data.id) {
      var post = posts.reduce(function(prev, cur) {
        prev[cur.id] = cur;
        return prev;
      }, { });
      var curPost = post[data.id];
      for(var i in curPost) {
        curPost[i] = data[i];
      }
    }
    else {
      var ids = posts.map(function(e) { return e.id });
      data.id = Math.max.apply(Math, ids);
      if(data.id > 0) {
        data.id += 1;
      }
      else {
        data.id = 1;
      }
      posts.push(data);
    }
    return localStorageService.set('posts', posts);
  };

  return API;
});
