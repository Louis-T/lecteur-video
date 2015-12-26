var React = require('react');
var ProgressBar = require('./ProgressBar.js');

var Video = React.createClass({
	getInitialState: function(){
	    return {
	       duration: 0,
		   currentTime: 0,
		   buffered: 0,
		   paused: true
	    };
	},
	getDefaultProps: function(){
		return {
			width: 640,
			height: 360
		};
	},
	getBtnClasses: function(){
		if(this.state.duration == 0){
			return "videoBtn videoBtnWaiting";
		}
		else {	
			return "videoBtn"+(this.state.paused?" videoBtnPaused":"");
		}
	},
	componentDidMount: function() {
		
	},
	componentDidUpdate: function (props, state) {
		if (this.state.paused && !state.paused) {
			this.pauseVideo();
		} else if (!this.state.paused && state.paused) {
			this.playVideo();
		}
	},
	onLoadedMetadata: function() {
		this.setState({
			duration: this.refs.Video.duration
		});
	},
	onTimeUpdate: function() {
		this.setState({
			currentTime: this.refs.Video.currentTime
		});
	},
	onProgress: function(){
		setTimeout((function(){
				this.setState({
					buffered: this.refs.Video.buffered.end(this.refs.Video.buffered.length - 1)
				});
			}).bind(this));
	},
	setVideoTime: function(t) {
		if(t < 0){
			
		}
		else if(t > this.state.duration){
			
		}
		else {
			this.refs.Video.currentTime = t;
		}
	},
	togglePlay: function(){
		if(this.state.duration > 0){
			this.setState({
				paused: !this.state.paused
			});
		}
	},
	pauseVideo: function(){
		this.refs.Video.pause();
	},
	playVideo: function(){
		if(!this.state.paused){ // pour régler le probleme du curseur que l'on bouge pour choisir le temps
			this.refs.Video.play();
		}
	},
	render: function(){
		return (
			<div className="videoContainer" style={{width: this.props.width}}>
				<video className="video" width={this.props.width} height={this.props.height} ref="Video" onLoadedMetadata={this.onLoadedMetadata} onTimeUpdate={this.onTimeUpdate} onProgress={this.onProgress} >
					<source src="./ressources/big_buck_bunny.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className={this.getBtnClasses()} onClick={this.togglePlay} ></div>
				<ProgressBar width={this.props.width - 50} videoDuration={this.state.duration} currentTime={this.state.currentTime} buffered={this.state.buffered} setVideoTime={this.setVideoTime} pauseVideo={this.pauseVideo} playVideo={this.playVideo} />
			</div>
		);
	}
});

module.exports = Video;