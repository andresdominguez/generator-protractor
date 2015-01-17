'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var os = require('os');

describe('protractor generator', function() {
  var app,
      configFileName = 'theConfigFileName.js',
      baseUrl = 'ThisIsTheBaseUrl';

  beforeEach(function(done) {
    helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp'))
        .withOptions({'skip-install': true})
        .withPrompt({
          someOption: true
        })
        .on('end', done);
  });

  var runGenerator = function(promptOptions, done) {
    helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp'))
        .withOptions({'skip-install': true})
        .withPrompt(promptOptions)
        .on('end', done);
  };

  it('should import generator', function() {
    var app = require('../app');
    assert(app !== undefined);
  });

  it('should generate files', function(done) {
    runGenerator({
      configName: configFileName,
      baseUrl: baseUrl,
      browsers: 'Chrome'
    }, function() {
      // Ensure the config file, package, README, and test files are generated.
      assert.file([
        configFileName,
        'package.json',
        'README.txt',
        'spec/example_spec.js'
      ]);

      // Ensure the configuration file contains the base url.
      assert.fileContent(configFileName, /ThisIsTheBaseUrl/);

      done();
    });
  });

  describe('Browser choice', function() {
    it('should create config for chrome', function(done) {
      runGenerator({
        configName: configFileName,
        baseUrl: baseUrl,
        browsers: 'Chrome'
      }, function() {
        // Ensure the configuration file contains chrome.
        assert.fileContent(configFileName, /'browserName': 'chrome'/);

        done();
      });
    });

    it('should create config for Firefox', function(done) {
      runGenerator({
        configName: configFileName,
        baseUrl: baseUrl,
        browsers: 'Firefox'
      }, function() {
        // Ensure the configuration file contains firefox.
        assert.fileContent(configFileName, /'browserName': 'firefox'/);

        done();
      });
    });

    it('should create config for both chrome and firefox', function(done) {
      runGenerator({
        configName: configFileName,
        baseUrl: baseUrl,
        browsers: 'Both, at the same time'
      }, function() {
        // Ensure the configuration is multi-browser.
        assert.fileContent(configFileName, /multiCapabilities/);

        done();
      });
    });
  });
});
