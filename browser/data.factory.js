'use strict';

app.factory('DataFactory', function($http){
	var DataFactory = {};

	DataFactory.getNodeData = function(){
		return $http.get('http://localhost:1337/nodes')
		.then(function(nodeData){
			return nodeData.data
		})
	}

	DataFactory.getLaneData = function(){
		return $http.get('http://localhost:1337/lanes')
		.then(function(laneData){
			return laneData.data
		})
	}

	return DataFactory;
})
