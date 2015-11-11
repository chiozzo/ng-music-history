var app = angular.module('musicHistory', []);

app.controller("songsCtrl", function($scope, $http) {

  $scope.songs = null;

  $.ajax('songs1.json')
  .done(function(ajaxData){
    $scope.songs = ajaxData;
    $scope.$apply();
  }).fail(function(error){
    console.log("error", error);
  });

  //Still null because $http is asynrounous and is still running
  // console.log("$scope.songs", $scope.songs);
/**************************************************
  $scope.deleteSong() = function(i){
    console.log("hello");
  }

**************************************************/

});

// $.material.init();