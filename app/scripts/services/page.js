'use strict';

angular.module('personyApp').factory('Page', ['$location', function ($location) {
  var title = '', keywords = '', description = '',
      image = 'images/logo.png';
  return {
    getTitle: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; },
    getKeywords: function() { return keywords; },
    setKeywords: function(newKeywords) { keywords = newKeywords; },
    getDescription: function() { return description; },
    setDescription: function(newDescription) { description = newDescription; },
    getImage: function() { return image; },
    setImage: function(newImage) { image = newImage; },
    getUrl: function() { return $location.absUrl(); }
  };
}]);
