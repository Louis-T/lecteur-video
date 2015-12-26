var React = require('react');

var ProgressBar = React.createClass({
	getInitialState: function(){
	    return {
		   offsetLeft: 0,
		   dragging: false,
		   positionX: 0
	    };
	},
	getDefaultProps: function(){
		return {
			width: 640,
			videoDuration: 0,
			currentTime: 0,
			buffered: 0,
			setVideoTime: function(){console.log("Not implemented");},
			pauseVideo: function(){console.log("Not implemented");},
			resumeVideo: function(){console.log("Not implemented");}
		};
	},
	componentDidMount: function() {
		setTimeout(this.measureProgressBar);
	},
	measureProgressBar: function() {
		this.setState({offsetLeft: this.refs.progressBar.getBoundingClientRect().left});
	},
	componentWillReceiveProps : function(props){
		if(props.videoDuration > 0){
			this.setState({
				positionX : props.currentTime * 1.0 / props.videoDuration * props.width
			});
		}
	},
	getBufferedLength: function(){
		if(this.props.videoDuration > 0){
			return this.props.buffered * 1.0 / this.props.videoDuration * this.props.width;
		}
		else {
			return 0;
		}
	},
	onMouseDown: function(e){
		if(this.props.videoDuration > 0){
			var newPositionX = e.clientX - this.state.offsetLeft;
			if(newPositionX < 0){
				newPositionX = 0;
			}
			else if(newPositionX > this.props.width){
				newPositionX = this.props.width;
			}
			
			this.setState({
				dragging: true,
				positionX  : newPositionX
			});
			this.props.pauseVideo();
		}
		e.stopPropagation();
		e.preventDefault();
	},
	onMouseUp: function(e){
		this.setState({
			dragging: false
		});
		this.props.playVideo();
		e.stopPropagation();
		e.preventDefault();
	},
	onMouseMove: function(e){
		var newPositionX = e.clientX - this.state.offsetLeft;
		if(newPositionX < 0){
			newPositionX = 0;
		}
		else if(newPositionX > this.props.width){
			newPositionX = this.props.width;
		}
		//if(this.state.positionX != newPositionX)
		this.setState({
			positionX  : newPositionX
		});
		e.stopPropagation();
		e.preventDefault();
	},
	componentDidUpdate: function (props, state) {
		if (this.state.dragging && !state.dragging) {
		  document.addEventListener('mousemove', this.onMouseMove)
		  document.addEventListener('mouseup', this.onMouseUp)
		} else if (!this.state.dragging && state.dragging) {
		  document.removeEventListener('mousemove', this.onMouseMove)
		  document.removeEventListener('mouseup', this.onMouseUp)
		}
		
		if(this.state.dragging && this.state.positionX != state.positionX && this.props.videoDuration > 0){
			this.props.setVideoTime(this.state.positionX * 1.0 / this.props.width * this.props.videoDuration);
		}
	},
	render: function(){
		
		return (
			<div className="progressBar" style={{width: this.props.width}} ref="progressBar" onMouseDown={this.onMouseDown}>
				<div className="progressCursor" style={{left: this.state.positionX}} onMouseDown={this.onMouseDown} ></div>
				<div className="bufferedBar" style={{width: this.getBufferedLength()}}></div>
			</div>
		);
	}
});

module.exports = ProgressBar;