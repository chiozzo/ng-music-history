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

  var localSongs = null;

return {
  getSongfromJSON: function(){
    return $q(function(resolve, reject){
      $http.get('songs.json')
      .success(function(objectFromJSONFile){
        localSongs = objectFromJSONFile;
        resolve(objectFromJSONFile);
      }, function(error){
        reject(error);
      });
    });
  },

  getLocalSongs: function(){
    return localSongs;
  },

  addSongToJSON: function(newSong){
    console.log("newSong", newSong);
    localSongs.push(newSong);
  }
};
});

app.controller('addSongsCtrl', ['$scope', 'songFactory', function($scope, songFactory){



  $scope.newSong = {
    title: null,
    artist: null,
    album: null
  };

  $scope.addSong = function(){
    songFactory.addSongToJSON({
      title: $scope.newSong.title,
      artist: $scope.newSong.artist,
      album: $scope.newSong.album
    });
    $scope.newSong = {
      title: null,
      artist: null,
      album: null
    };
  };

}]);

app.controller("songsCtrl", ['$scope', 'songFactory', function($scope, songFactory) {

  if(songFactory.getLocalSongs() === null){
    songFactory.getSongfromJSON()
    .then(function(JSONarray){
      $scope.songList = JSONarray;
    });
  } else {
    $scope.songList = songFactory.getLocalSongs;
  }

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
deleteSong seems to not be recognizing $(this) without it's own click event. Redundant, I know.
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
}]);


// I'm supposed to wrap all my code in a closure?
(function() { })();

// $.material.init();