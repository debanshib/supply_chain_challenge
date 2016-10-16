'use strict'

app.controller('ChartCtrl', function($scope, $http, ChartFactory) {

	var chartArray = [
		{elementId: 'highestInventory', type: 'inventory', ascdesc: 'desc'},
		{elementId: 'lowestInventory', type: 'inventory', ascdesc: 'asc'},
		{elementId: 'highestCycle', type: 'cycle_time', ascdesc: 'desc'},
		{elementId: 'lowestCycle', type: 'cycle_time', ascdesc: 'asc'}]

	
	$scope.loadData = function(){
		ChartFactory.createCharts(chartArray)
	}

	//User views different graphs
	
	$scope.A = true, $scope.B = $scope.C = $scope.D = false;
	$scope.highestInventory = function(){
		$scope.B = $scope.C = $scope.D = false;
		$scope.A = true;

	}
	$scope.lowestInventory = function(){
		$scope.A = $scope.C = $scope.D = false;
		$scope.B = true;

	};
	$scope.highestCycleTime = function(){
		$scope.A = $scope.B = $scope.D = false;
		$scope.C = true;

	};
	$scope.lowestCycleTime = function(){
		$scope.A = $scope.B = $scope.C = false;
		$scope.D = true;
	};
		
})





