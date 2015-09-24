TodoApp.controller('TodoListCtrl', function($scope, TasksTable) {

	new TasksTable().getTasks().then(function (tasks) {
		$scope.todos = [];		
		for(i=0; i < tasks.length; i++)
			$scope.todos.push({title:tasks[i].get('title'), id:tasks[i].id});
	});
	
	$scope.addTodo = function () {
		if (!$scope.formTodoTitle || $scope.formTodoDescription){
			alert("Please fill the task's title and description");
			return;
		}		
		$scope.todos.push({title:$scope.formTodoTitle});
		var task = new TasksTable().addTask($scope.formTodoTitle, $scope.formTodoDescription);
		task.then(function (task) {			
			var lastAddedLink = $("li:last-child a")[0];
			$(lastAddedLink).attr('href', $(lastAddedLink).attr('href') + task[0].id);			
		});
		$scope.formTodoTitle = '';
		$scope.formTodoDescription = '';
	};
}); 

TodoApp.controller('TodoCtrl', function($scope, $routeParams, TasksTable) {
	$scope.todoId = $routeParams.todoId;
	new TasksTable().getTask($routeParams.todoId).then(function (tasks) {
		console.log(tasks)				
		$scope.todo = tasks;
	});
});
