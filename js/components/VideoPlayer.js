var React = require('react');
var Video = require('./Video.js');

var VideoPlayer = React.createClass({
	getInitialState: function(){
	    return {
	       width: 640,
	       height: 360
	    }
	},
	render: function(){
		return (
			<div className="videoPlayer">
				<Video width={this.state.width} height={this.state.height} />
			</div>
		);
	}
});

module.exports = VideoPlayer;