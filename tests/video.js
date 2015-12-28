module.exports = {
  'Demo lecteur video' : function (browser) {
    browser
      .url('http://louis-t.github.io/lecteur-video/')
      .waitForElementVisible('#container', 1000)
	  .waitForElementVisible('.videoPlayer', 1000)
	  .waitForElementVisible('.progressBar', 1000)
	  .waitForElementVisible('.videoBtn', 1000)
	  .waitForElementVisible('.videoBtnPaused', 5000)
	  .assert.elementPresent('.video')
	  .assert.cssProperty('.progressCursor', 'left', '0px')
	  .click(".videoBtn")
	  .pause(2000)
	  .assert.elementNotPresent('.videoBtnPaused')
	  .click(".videoBtn")
	  .pause(2000)
	  .assert.elementPresent('.videoBtnPaused')
	  .pause(2000);
      
	  browser.expect.element('.progressCursor').to.have.css('left').which.does.not.equal('0px');
	  
	  browser.execute(function(){return document.querySelector('.video').duration;}, [], function(response) {
		  browser.assert.equal(response.value, 60.139683);
	  });
	  
	  browser
		.moveToElement('.progressBar', 10, 2)
		.mouseButtonDown(0)
		.assert.cssProperty('.progressCursor', 'left', '10px')
		.pause(1000)
		.assert.elementPresent('.videoBtnPaused')
		.pause(1000)
		.click(".videoBtn")
		.moveToElement('.progressBar', 150, 2)
		.mouseButtonDown(0)
		.assert.cssProperty('.progressCursor', 'left', '150px')
		.pause(1000)
		.assert.elementNotPresent('.videoBtnPaused');
	  
	  browser.end();
  }
};