//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {
	
	$routeProvider

	.when('/', {
		templateUrl: "views/home.html",
		controller: "homeController"

	})

	.when('/forecast', {
		templateUrl: "views/forecast.html",
		controller: "forecastController"
	})

	.when('/forecast/:days', {
		templateUrl: "views/forecast.html",
		controller: "forecastController"
	})

});


weatherApp.service('cityService', function(){
		
	this.city = "";

});


weatherApp.controller('homeController', ['$scope', '$log', 'cityService', function($scope, $log, cityService){
		
	$scope.city = cityService.city;

	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});


}]);


weatherApp.controller('forecastController', ['$scope', '$sce', '$log', '$resource', '$routeParams', '$http', '$q', '$timeout', 'cityService', function($scope, $sce, $log, $resource, $routeParams, $http, $q, $timeout, cityService){
		
		$scope.city = cityService.city;

		url='http://api.openweathermap.org/data/2.5/forecast/daily/';
  		$scope.embedUrl=$sce.trustAsResourceUrl(url)

		$scope.days = $routeParams.days || '5';

		$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
		{
			get: {
				method: "JSONP",
				isArray: true,
				callback: "JSON_CALLBACK"
			}
		});

		$scope.weatherResult = $scope.weatherAPI.get({
			q: $scope.city,
			cnt: $scope.days,
			units: 'metric',
			appid: "333c2d80b4f7f8bbe936f0cf6aabafdd"
		});

		console.log($scope.weatherResult);

		$scope.convertToDate = function(dt){

			return new Date(dt * 1000);

		}


}]);



























































