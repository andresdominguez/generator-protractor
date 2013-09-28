/*global describe, expect, protractor, it*/
'use strict';

describe('angularjs homepage', function() {
  var ptor = protractor.getInstance();

  it('should greet using binding', function() {
    // Go to the Angular website.
    ptor.get('http://www.angularjs.org');

    // Find the input of the hello example and enter a value.
    ptor.findElement(protractor.By.input('yourName')).sendKeys('Julie');

    // Find by binding.
    var locator = protractor.By.binding('Hello {{yourName}}!');

    // The Protractor API returns promises.
    ptor.findElement(locator).getText().then(function(text) {
      expect(text).toEqual('Hello Julie!');
    });

    // You can also use the short version.
    expect(ptor.findElement(locator).getText()).toEqual('Hello Julie!');
  });
});
