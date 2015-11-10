var app = angular.module('musicHistory', []);

console.log("hello");

app.controller('songsCtrl', function($scope){

	$scope.songs = null;

	$.ajax('songs1.json')
	.done(function(songsJSON){
		songs = songsJSON;
		console.log("songs", songs);
	}).fail(function(error){
		console.log("error", error);
	});

});