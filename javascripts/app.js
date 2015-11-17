var app = angular.module('musicHistory', ['firebase','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/songs/list', {
    templateUrl: 'partials/song-list.html',
    controller: 'songsCtrl as SongsCtrl'
  })
  .when('/songs/new', {
    templateUrl: 'partials/song-form.html',
    controller: 'addSongsCtrl as AddSongsCtrl'
  });
}]);

app.controller('allCtrl', [function(){

  this.filterString;

}]);

app.controller('addSongsCtrl', ['$firebaseArray', function($firebaseArray){

  var firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com/users/6c7cc7e9-b5d8-42f1-acf8-b0a98a1e185f/songs');

  this.songList = $firebaseArray(firebaseRef);

  this.newSong = {
    title: null,
    artist: null,
    album: null
  };

  this.addSong = function(){
    this.songList.$add({
      title: this.newSong.title,
      artist: this.newSong.artist,
      album: this.newSong.album
    }.bind(this));
    this.newSong = {
      title: null,
      artist: null,
      album: null
    };
  };

}]);

app.controller("songsCtrl", ['$firebaseArray', function($firebaseArray) {

  var firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com/users/6c7cc7e9-b5d8-42f1-acf8-b0a98a1e185f/songs');

  this.songList = $firebaseArray(firebaseRef.orderByChild('artist'));

  this.songList.$loaded()
  .then(function(){
    console.log("this.songList", this.songList);
  }.bind(this));

/**************************************************
deleteSong seems to not be recognizing $(this) without it's own click event. Redundant, I know.
**************************************************/
  this.deleteSong = function(i){
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
// $.material.init();