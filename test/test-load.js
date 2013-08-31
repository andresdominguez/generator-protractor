/*global describe, it, require*/
'use strict';

var assert = require('assert');

describe('protractor generator', function() {
  it('can be imported without blowing up', function() {
    var app = require('../app');
    assert(app !== undefined);
  });
});
