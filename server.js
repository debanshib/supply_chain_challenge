'use strict'
var fs = require('fs')
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
 

var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/browser'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

var exports = module.exports = {};

app.get('/nodes', function(req, res, next){
	fs.readFile(__dirname + '/data/nodes.json', 'utf8', function(err, data){
		if (err) console.log(err)
		else return res.send(data);
	})
})

app.get('/lanes', function(req, res, next){
	fs.readFile(__dirname + '/data/lanes.json', 'utf8', function(err, data){
		if (err) console.log(err)
		else return res.send(data);
	})
})

app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname + '/index.html'))
})

var port = 1337;
app.listen(port, function() {
    console.log('SERVER listening on port: ' + port);
});