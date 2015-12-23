// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var VideoPlayer = require('./components/VideoPlayer.js');

ReactDOM.render(
	<VideoPlayer />,
	document.getElementById('container')
);