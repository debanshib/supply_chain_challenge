'use strict';

app.factory('ChartFactory', function($http, DataFactory){
	var ChartFactory = {};

	ChartFactory.createCharts = function(chartArray){
		if (!chartArray.length) return new Error ('no chart Array')
		return DataFactory.getNodeData()
		.then((nodelist)=>{
			
			chartArray.forEach((chart)=>{
				
				//sort data
				if (chart.type === 'inventory'){
					if (chart.ascdesc === 'desc') nodelist = nodelist.sort((a,b)=>{return b.inventory - a.inventory})
					else nodelist = nodelist.sort((a,b)=>{return a.inventory - b.inventory})
				} 
				if (chart.type === 'cycle_time'){
					if (chart.ascdesc === 'desc') nodelist = nodelist.sort((a,b)=>{return b.cycle_time - a.cycle_time})
					else nodelist = nodelist.sort((a,b)=>{return a.cycle_time - b.cycle_time})
				}
				
				//create chart
				var ctx = document.getElementById(chart.elementId)
				var myChart = new Chart(ctx, {
				    type: 'bar',
				    data: {
				        labels: nodelist.map((node)=>{return node.name}),
				        datasets: [{
				            label: chart.type + ' ' + chart.ascdesc,
				            data: nodelist.map((node)=>{return node[chart.type]}),
				            backgroundColor: nodelist.map((node, i)=>{
				            	if (i % 2 === 1) return 'rgba(255, 206, 86, 0.2)'
				            	if (i % 2 === 0) return 'rgba(255, 99, 132, 0.2)'
				            })
				        }]
				    },
				    options: {scales: {yAxes: [{ticks: {beginAtZero:true}}]}}
				})
			});
		})
	}
	
	return ChartFactory;
})
