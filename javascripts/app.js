var app = angular.module('musicHistory', ['firebase','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl as LoginCtrl'
  })
  .when('/songs/list', {
    templateUrl: 'partials/song-list.html',
    controller: 'songsCtrl as SongsCtrl'
  })
  .when('/songs/new', {
    templateUrl: 'partials/song-form.html',
    controller: 'addSongsCtrl as AddSongsCtrl'
  });
}]);

app.controller('allCtrl', function(){

  this.filterString = "";

});

app.controller('addSongsCtrl', ['$firebaseArray', function($firebaseArray){

  var firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com/users/6c7cc7e9-b5d8-42f1-acf8-b0a98a1e185f/songs');

  this.songList = $firebaseArray(firebaseRef);

  this.newSong = {
    title: null,
    artist: null,
    album: null,
    rating: null
  };

  this.addSong = function(){
    this.songList.$add({
      title: this.newSong.title,
      artist: this.newSong.artist,
      album: this.newSong.album,
      rating: this.newSong.rating
    });
    this.newSong = {
      title: null,
      artist: null,
      album: null,
      rating: null
    };
  };

}]);

app.controller('loginCtrl', function(){
  this.loginGitHub = function(){
    var ref = new Firebase("https://blinding-heat-7542.firebaseio.com");
    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };
});

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

app.directive('songBrief', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/song-brief.html',
    scope:{
      selectedSong: "=song",
      maxRating: "="
    },
    link: function(scope, element, attributes){
      var setStars = function(){
        scope.stars = [];
        var rating = parseInt(scope.selectedSong.rating);
        for (var i = 0; i < scope.maxRating; i++) {
          var clazz = (rating <= i) ? "star--empty" : "star--filled";
          scope.stars.push({class: clazz});
        }
      };
      scope.$watch('selectedSong', function(value){
        scope.selectedSong = value;
        setStars();
      });
      setStars();
    }
  };
});


// I'm supposed to wrap all my code in a closure?
(function() { })();

// Initialize material design
// $.material.init();