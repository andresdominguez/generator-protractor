/**
 * This example shows how to use the protractor library in a jasmine-node test.
 * It assumes that a selenium server is running at localhost:4444.
 * Run this test with:
 *   jasmine-node onJasmineNodeSpec.js
 */

var webdriver = require('selenium-webdriver');
var protractor = require('protractor');
require('jasminewd');

describe('angularjs homepage', function() {

  var driver = new webdriver.Builder().
      usingServer('http://localhost:4444/wd/hub').
      withCapabilities(webdriver.Capabilities.chrome()).build();

  driver.manage().timeouts().setScriptTimeout(10000);
  var ptor = protractor.wrapDriver(driver);

  it('should greet using binding', function() {
    ptor.get('http://www.angularjs.org');

    ptor.findElement(protractor.By.input("yourName")).sendKeys("Julie");

    ptor.findElement(protractor.By.binding("Hello {{yourName}}!")).
        getText().then(function(text) {
          expect(text).toEqual('Hello Julie!');
        });
  }, 10000);

  it('afterAll', function() {
    // This is a sad hack to do any shutdown of the server.
    // TODO(juliemr): Add afterall functionality to jasmine-node
    driver.quit();
  })
});
