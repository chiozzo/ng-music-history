var app = angular.module('musicHistory', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/songs/list', {
    templateUrl: 'partials/song-list.html',
    controller: 'songsCtrl'
  })
  .when('/songs/new', {
    templateUrl: 'partials/song-form.html',
    controller: 'addSongsCtrl'
  });
}]);

app.factory('songFactory', function($http, $q){

  var getSongData = function(){
    return $q(function(resolve, reject){
      $http.get('songs.json')
      .success(function(objectFromJSONFile){
        resolve(objectFromJSONFile);
      }, function(error){
        reject(error);
      });
    });
  };
});

app.controller('addSongsCtrl', ['$scope', 'songFactory', function($scope){



  $scope.newSong = {
    title: null,
    artist: null,
    album: null
  };

  $scope.addSong = function(){
    $scope.$add({
      title: $scope.newSong.title,
      artist: $scope.newSong.artist,
      album: $scope.newSong.album
    });
  };

}]);

app.controller("songsCtrl", function($scope) {

/**************************************************
filterSongs is going to filter song list based on selected option from dropdown
**************************************************/
  $scope.filterSongs = function(i){

  };

  $scope.oneSong = function(song){
    console.log("song", song);
    $.ajax('songs.json')
    .done(function(ajaxSongs1){
      $scope.singleSong = ajaxSongs1;
    }).fail(function(error){
      console.log("error", error);
    });
  };

/**************************************************
deleteSong seems to not be recognizing $(this)
**************************************************/
  $scope.deleteSong = function(i){
    console.log("i", i);
    $(document).on('click', '.song-entry', function(){
      var thisSong = $(this).closest(".song-entry");
      console.log("thisSong", thisSong);
      thisSong.hide(function() {
        $(this).remove();
      });
    });
  };
});

// $.material.init();