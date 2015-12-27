module.exports = {
  'Demo lecteur video' : function (browser) {
    browser
      .url('http://louis-t.github.io/lecteur-video/')
      .waitForElementVisible('#container', 1000)
	  .waitForElementVisible('.videoPlayer', 1000)
	  .waitForElementVisible('.progressBar', 1000)
	  .waitForElementVisible('.videoBtn', 1000)
	  .verify.elementPresent('.videoBtnWaiting')
	  .waitForElementVisible('.videoBtnPaused', 5000)
	  .assert.elementPresent('.video')
	  .click(".videoBtn")
	  .pause(2000)
	  .assert.elementNotPresent('.videoBtnPaused')
	  .click(".videoBtn")
	  .pause(2000)
	  .assert.elementPresent('.videoBtnPaused')
      .end();
  }
};