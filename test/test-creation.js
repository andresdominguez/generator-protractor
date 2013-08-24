/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('protractor generator', function() {
  var app;

  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      app = helpers.createGenerator('protractor:app', [
        '../../app'
      ]);
      done();
    });
  });

  var createProject = function(configFileName) {
    helpers.mockPrompt(app, {
      'configName': configFileName
    });
    app.options['skip-install'] = true;
    app.run({}, function() {
    });
  };

  it('should create config file and package.json', function(done) {
    var configFileName = 'theConfigFileName.js';

    helpers.mockPrompt(app, {
      'configName': configFileName
    });
    app.options['skip-install'] = true;
    app.run({}, function() {
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
      createProject('myConf.js');
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
        helpers.assertFiles(['spec/my-testSpec.js']);
        done();
      })
    });
  });
});
