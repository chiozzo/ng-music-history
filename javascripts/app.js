var app = angular.module('musicHistory', ['firebase','ngRoute']);

// app.config(['$routeProvider', function($routeProvider){
//   $routeProvider
//   .when('/songs/list', {
//     templateUrl: 'partials/song-list.html',
//     controller: 'songsCtrl'
//   })
//   .when('/songs/new', {
//     templateUrl: 'partials/song-form.html',
//     controller: 'addSongsCtrl'
//   });
// }]);

app.controller('addSongsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){

  var firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com/users/6c7cc7e9-b5d8-42f1-acf8-b0a98a1e185f/songs');

  $scope.songList = $firebaseArray(firebaseRef);

  $scope.newSong = {
    title: null,
    artist: null,
    album: null
  };

  $scope.addSong = function(){
    $scope.songList.$add({
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

app.controller("songsCtrl", ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

  var firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com/users/6c7cc7e9-b5d8-42f1-acf8-b0a98a1e185f/songs');

  $scope.songList = $firebaseArray(firebaseRef.orderByChild('artist'));

  $scope.songList.$loaded()
  .then(function(){
    console.log("$scope.songList", $scope.songList);
  });

/**************************************************
deleteSong seems to not be recognizing $(this) without it's own click event. Redundant, I know.
**************************************************/
  $scope.deleteSong = function(i){
    console.log("i", i);
    $(document).on('click', '.song-entry', function(){
      var thisSong = angular.element(this).closest(".song-entry");
      console.log("thisSong", thisSong);
      thisSong.hide(function() {
        $(this).remove();
      });
    });
  };
}]);


// I'm supposed to wrap all my code in a closure?
(function() { })();

// Initialize material design
$.material.init();