/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('protractor generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('protractor:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('should create config file and package.json', function(done) {
    var configFileName = 'theConfigFileName.js';

    helpers.mockPrompt(this.app, {
      'configName': configFileName
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function() {
      helpers.assertFiles([
        configFileName,
        'package.json'
      ]);
      done();
    });
  });

  describe('Unit test creation', function() {
    var generator;

    beforeEach(function(done) {
      generator = helpers.createGenerator('protractor:unit', [
        '../../unit'
      ], 'my-test');
      done();
    });

    it('should create a protractor unit test', function(done) {
      helpers.mockPrompt(generator, {
        'testType': 'protractor'
      });
      generator.run({}, function() {
        helpers.assertFiles(['my-testSpec.js']);
        done();
      })
    });
  });
});
