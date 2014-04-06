/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('protractor generator', function() {
  var app,
      configFileName = 'theConfigFileName.js',
      baseUrl = 'ABC';

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

  var runGenerator = function(browsersChoice, callback) {
    helpers.mockPrompt(app, {
      'configName': configFileName,
      'baseUrl': baseUrl,
      'browsers': browsersChoice
    });
    app.options['skip-install'] = true;
    app.run({}, callback);
  };

  describe('Project creation', function() {
    it('should create config file and package.json', function(done) {
      runGenerator('Chrome', function() {
        // Ensure the configuration and the package.json files were created.
        assert.file([
          configFileName,
          'package.json',
          'README.txt',
          'spec/example_spec.js'
        ]);

        // Ensure the configuration file contains the timeout.
        assert.fileContent(configFileName, /ABC/);

        done();
      });
    });
  });

  describe('Browser choice', function() {
    it('should create config for chrome', function() {
      runGenerator('Chrome', function() {
        // Ensure the configuration file contains chrome.
        assert.fileContent(configFileName, /'browserName': 'chrome'/);
      });
    });

    it('should create config for Firefox', function() {
      runGenerator('Firefox', function() {
        // Ensure the configuration file contains firefox.
        assert.fileContent(configFileName, /'browserName': 'firefox'/);
      });
    });

    it('should create config for both chrome and firefox', function() {
      runGenerator('Both, at the same time', function() {
        // Ensure the configuration is multi-browser.
        assert.fileContent(configFileName, /multiCapabilities/);
      });
    });
  });
});
