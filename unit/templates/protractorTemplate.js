var util = require('util');

describe('angularjs homepage', function() {
  var ptor = protractor.getInstance(),
      TIMEOUT = 10000;

  it('should greet using binding', function() {

    ptor.get('http://www.angularjs.org');

    ptor.findElement(protractor.By.input("yourName")).sendKeys("Julie");

    ptor.findElement(protractor.By.binding("Hello {{yourName}}!")).
        getText().then(function(text) {
          expect(text).toEqual('Hello Julie!');
        });
  }, TIMEOUT);
});
