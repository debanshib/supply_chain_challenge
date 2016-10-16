'use strict';

app.factory('MapFactory', function($http, DataFactory){
	var MapFactory = {};

	var map;
	MapFactory.initializeMap = function(){
		map = new google.maps.Map(document.getElementById("map_canvas"),{
        		zoom: 3,
        		minZoom: 2,
        		maxZoom: 10,
             	center: new google.maps.LatLng(37.394437,-122.150146),
              	mapTypeId: google.maps.MapTypeId.ROADMAP,
              	draggable: true,
              	disableDoubleClickZoom: false });

		return map;
	}

	MapFactory.initializeMarkers = function(){
		return DataFactory.getNodeData()
		.then((nodeData)=>{
			var markers =  new Array();
	    	nodeData.forEach((node, i)=>{
	    	markers[i] = new google.maps.Marker({
	    		position: {lat: node.lat, lng: node.lng},
	    		map: map,
	    		title: node.name,
	    		metadata: {id: node.id, name: node.name, inventory: node.inventory, cycle_time: node.cycle_time}
	    	})
	    	markers[i].setMap(map);
	    	markers[i].info = new google.maps.InfoWindow({
	    		metadata: {id: node.id},
	    		content: 'Factory: '+node.name+'<br>Inventory: '+ node.inventory + '<br>Cycle Time: ' + node.cycle_time
	    		})
			})
			return markers;
		})
	}

	MapFactory.initializeLanes = function(){
		return DataFactory.getLaneData()
		.then((laneData)=>{
			var paths = new Array()
			laneData.forEach((lane, p)=>{
	    	var laneRoute = [
	    			new google.maps.LatLng(
	    				lane.geometry.coordinates[0][1], lane.geometry.coordinates[0][0]), 
	    			new google.maps.LatLng(
	    				lane.geometry.coordinates[1][1], lane.geometry.coordinates[1][0])];
	    	
	    	var laneSymbol = { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW };

	    		paths[p] = new google.maps.Polyline({
		    		path: laneRoute,
		    		icons: [{
		    			icon: laneSymbol,
		    			offset: '100%'
		    		}],
		    		strokeColor: "#FF0000",
				    strokeOpacity: 1.0,
				    strokeWeight: 1,
				    metadata: {id: lane.id, cycle_time: lane.cycleTime}
		    	})
	    		paths[p].setMap(map)
	    	})
	    	return paths;
		})
	}



	return MapFactory;
})
