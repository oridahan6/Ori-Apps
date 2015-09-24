TodoApp.factory("TasksTable", function($http, $q) {
	var TasksTable = function() {
		Parse.initialize('KNVwkCtekQoidPh7vAhNq3qICNJhfcBsGTehjf0c', 'QXqCNTp1132O4mTEZ02GTk4Kx0KSonXLfijN7V4i');

		this.getTasks = function() {
			var TasksDfd = $q.defer();
			var Tasks = Parse.Object.extend('Tasks');
			var queryTasks = new Parse.Query(Tasks);
			queryTasks.find().then(function (data) {
				TasksDfd.resolve(data);
			}, function (error) {
				TasksDfd.reject(data);
			});
			return TasksDfd.promise;
		};
		
		this.getTask = function(id) {
			var TasksDfd = $q.defer();
			var Tasks = Parse.Object.extend('Tasks');
			var queryTasks = new Parse.Query(Tasks);
			queryTasks.get(id).then(function (data) {
				TasksDfd.resolve(data);
			}, function (error) {
				TasksDfd.reject(data);
			});
			return TasksDfd.promise;	
		};
		
		this.addTask = function(title, description) {
			var Tasks = Parse.Object.extend("Tasks");
			var tasks = new Tasks();
			tasks.save({
				title: title, 
				description: description
			});

			var TasksDfd = $q.defer();
			var queryTasks = new Parse.Query(Tasks);
			queryTasks.descending("createdAt");
			queryTasks.limit(1);
			queryTasks.find().then(function (data) {
				TasksDfd.resolve(data);
			}, function (error) {
				TasksDfd.reject(data);
			});
			return TasksDfd.promise;
		};
		
		this.updateTask = function(taskId, columnName, newValue) {
			var Tasks = Parse.Object.extend("Tasks");
			var queryTasks = new Parse.Query(Tasks);
			queryTasks.get(taskId,{
				success: function(tasks) {
					tasks.set(columnName,newValue);
					tasks.save();
				}
			});
		};
	} 
    return (TasksTable);
  });
