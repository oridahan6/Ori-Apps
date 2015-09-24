// create the module and name it TodoApp
// also include ngRoute for all our routing needs
var TodoApp = angular.module('TodoApp', ['ngRoute']);

// configure routes
TodoApp.config(function($routeProvider) {
	$routeProvider

		// route for the main page
		.when('/main', {
			templateUrl : 'views/main.html',
			controller  : 'TodoListCtrl'
		})		
		.when('/task/:todoId', {
			templateUrl: 'views/task.html',
			controller: 'TodoCtrl'
		})
		.otherwise({
			redirectTo: '/main'
		})
		;
});
