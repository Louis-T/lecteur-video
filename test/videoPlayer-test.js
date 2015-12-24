// Mocking window and document object:
require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

var VideoPlayer = require('../js/components/VideoPlayer.js');
var Video = require('../js/components/Video.js');
var ProgressBar = require('../js/components/ProgressBar.js');

describe('Testing my VideoPlayer', function() {
  jsdom({ skipWindowCheck: true });

  it('should switch button classes', function() {
    var myVideoPlayer = TestUtils.renderIntoDocument(
      <VideoPlayer />
    );
    var video_dom = TestUtils.findRenderedDOMComponentWithTag(myVideoPlayer, 'video');	
	var video_react = TestUtils.findRenderedComponentWithType(myVideoPlayer, Video);
	var btn_dom = TestUtils.findRenderedDOMComponentWithClass(video_react, 'videoBtn');

	assert.equal(btn_dom.className, "videoBtn videoBtnPaused");
	assert.equal(video_react.state.paused, true);
	TestUtils.Simulate.click(btn_dom);
	assert.equal(btn_dom.className, "videoBtn");
	assert.equal(video_react.state.paused, false);
  });

});

describe('Testing my VideoPlayer async', function() {
  jsdom({ skipWindowCheck: true });
	var myVideoPlayer = TestUtils.renderIntoDocument(
		<VideoPlayer />
	);
	var video_react = TestUtils.findRenderedComponentWithType(myVideoPlayer, Video);
	var progressBar_react = TestUtils.findRenderedComponentWithType(video_react, ProgressBar);
    var btn_dom = TestUtils.findRenderedDOMComponentWithClass(myVideoPlayer, 'videoBtn');
	TestUtils.Simulate.click(btn_dom);
	
	  beforeEach(function(done){  
		setTimeout(function(){
			
		  // complete the async beforeEach
		  done();

		}, 500);

	  });

	  it("will pass", function(){
		  console.log(progressBar_react.state, video_react.state, myVideoPlayer.state); 
		assert.equal(true, true);
	  });
});