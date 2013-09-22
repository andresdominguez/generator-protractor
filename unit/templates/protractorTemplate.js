/*global describe, expect, protractor, it*/
'use strict';

describe('angularjs homepage', function() {
  var ptor = protractor.getInstance();

  it('should greet using binding', function() {
    ptor.get('http://www.angularjs.org');

    ptor.findElement(protractor.By.input('yourName')).sendKeys('Julie');

    ptor.findElement(protractor.By.binding('Hello {{yourName}}!')).
        getText().then(function(text) {
          expect(text).toEqual('Hello Julie!');
        });
  });
});
