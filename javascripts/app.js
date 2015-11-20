var app = angular.module('musicHistory', ['firebase','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/song-list.html',
    controller: 'songsCtrl as SongsCtrl'
  })
  .when('/new', {
    templateUrl: 'partials/song-form.html',
    controller: 'addSongsCtrl as AddSongsCtrl'
  });
}]);

app.controller('allCtrl', function(){

  this.filterString = "";

});

/**
 * $firebaseAuth stuff should be in a factory
 */
app.controller("loginCtrl", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://blinding-heat-7542.firebaseio.com");

  this.auth = $firebaseAuth(ref);

  this.auth.$onAuth(function(authData) {
    this.authData = authData;
  }.bind(this));

  this.loginGitHub = function(){
    this.auth.$authWithOAuthPopup("github")
    .then(function(authData) {
      console.log("Authenticated successfully with payload:", authData);
    }).catch(function(error){
      console.log("Login Failed!", error);
    });
  }.bind(this);
}]);

/**
 * firebaseRef should point to specific user's /songs. Perhaps return from the factory
 */
app.controller('addSongsCtrl', ['$firebaseArray', function($firebaseArray){

  var firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com');
  var currentUser = firebaseRef.getAuth().uid;
  firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com/users/' + currentUser + "/songs");

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

/**
 * firebaseRef should point to specific user's /songs. Perhaps return from the factory
 */
app.controller("songsCtrl", ['$firebaseArray', function($firebaseArray) {

  var firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com');
  var currentUser = firebaseRef.getAuth().uid;
  firebaseRef = new Firebase('https://blinding-heat-7542.firebaseio.com/users/' + currentUser + "/songs");

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


/**
 * ANALYZE
 */
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