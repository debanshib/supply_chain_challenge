'use strict'

app.controller('MapCtrl', function($scope, MapFactory, DataFactory) {

	//initialize variables
	$scope.map, $scope.nodelist, $scope.paths, $scope.markers, $scope.highlightedPaths, $scope.viewLanes = false;
	$scope.openMarker, $scope.closeMarker, $scope.input, $scope.stillOpenMarkers = [];
	$scope.loadData = function(){
		$scope.map = MapFactory.initializeMap();
		initializeMap();
		DataFactory.getNodeData()
		.then((nodedata)=>{$scope.nodelist = nodedata.sort((a,b)=>{
			if (a.name > b.name) return 1
			else return -1
		})})
	}

	function initializeMap(){
		
		//create markers
		MapFactory.initializeMarkers().then((markers)=>{
			$scope.markers = markers;
			addListenersToMarkers();
		})

		//add listeners to markers
		function addListenersToMarkers(){
			$scope.markers.forEach((marker, i)=>{
			    //on clicking marker
			    google.maps.event.addListener(marker, 'click', function(){
			    	if (marker.metadata.infoOpen === true) $scope.closeMarker(marker) //already open
			    	else $scope.openMarker(marker) //first click
			    })
			    //on clicking the open info window
			    google.maps.event.addListener(marker.info,'closeclick', function(){
			    	$scope.closeMarker(marker)
			    })
			})
		}

		$scope.closeMarker = function(marker){
			marker.info.close();
			marker.metadata.infoOpen = false;
			$scope.highlightedPaths.forEach((path)=>{path.setMap(null)})
			console.log('marker closed: ', marker)
		}

		$scope.openMarker = function(marker){
			$scope.map.panTo(marker.getPosition());
			marker.info.open($scope.map, marker);
			marker.metadata.infoOpen = true;
			toggleLanesForSelectedNode(marker.metadata.id);
			$scope.stillOpenMarkers.push(marker);
			console.log('open markers: ', marker)
		}

	    //initialize paths
	    MapFactory.initializeLanes().then((paths)=>{
	    	$scope.paths = paths;
	    	$scope.paths.forEach((path)=>{path.setMap(null)})
	    })
	}

	//USER INTERACTIONS:

    //select or deselect all lanes
    $scope.toggleAllLanes = function(){
    	$scope.paths.forEach((path)=>{
    		if (path.getMap($scope.map)) {
    			path.setMap(null);
    			$scope.viewLanes = false;
    		}
    		else {
    			path.setMap($scope.map)
    			$scope.viewLanes = true;
    		}
    	})
    }
    
    //select or deselect lanes connected to a given node
    function toggleLanesForSelectedNode(nodeId){
    	$scope.paths.forEach((path)=>{
    		if (path.getMap($scope.map)) path.setMap(null)
    	})
    	$scope.highlightedPaths = $scope.paths.filter((path)=>{
    		return (path.metadata.id[0] === nodeId || path.metadata.id[1] === nodeId)
    	})
    	$scope.highlightedPaths.forEach((path)=>{
    		path.setMap($scope.map)
    	})
    }

    //close all info windows
    $scope.closeWindows = function(){
    	$scope.stillOpenMarkers.forEach((marker)=>{$scope.closeMarker(marker)})
    	$scope.stillOpenMarkers = [];
    	$scope.highlightedPaths = [];
    	console.log('open markers: ', $scope.stillOpenMarkers)
    }

    //find a factory through search bar
    $scope.findFactory = function(){
    	var foundFactory = $scope.markers.filter((marker)=>{
    		return (+marker.metadata.id === +$scope.input) })[0]
    	$scope.openMarker(foundFactory);
    	$scope.input = ''
    }
});





