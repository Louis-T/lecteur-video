// Mocking window and document object:
require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

describe('Testing my VideoPlayer', function() {
  jsdom({ skipWindowCheck: true });

  it('test', function() {
    var VideoPlayer = require('../js/components/VideoPlayer.js');
    var myVideoPlayer = TestUtils.renderIntoDocument(
      <VideoPlayer />
    );
    var video = TestUtils.findRenderedDOMComponentWithTag(myVideoPlayer, 'video');
	var btn = TestUtils.findRenderedDOMComponentWithTag(myVideoPlayer, 'button');

	assert.equal(btn.textContent, "Play");
	TestUtils.Simulate.click(btn);
	assert.equal(btn.textContent, "Pause");
  });
});