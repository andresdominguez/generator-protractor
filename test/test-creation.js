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

  describe('Project creation', function() {
    it('should create config file and package.json', function(done) {
      var configFileName = 'theConfigFileName.js',
          baseUrl = 'ABC';

      helpers.mockPrompt(app, {
        'configName': configFileName,
        'baseUrl': baseUrl
      });
      app.options['skip-install'] = true;
      app.run({}, function() {

        // Ensure the configuration and the package.json files were created.
        helpers.assertFiles([
          configFileName,
          'package.json',
          'README.txt',
          'spec/example_spec.js'
        ]);

        // Ensure the configuration file contains the timeout.
        helpers.assertFiles([
          [configFileName, /ABC/]
        ]);

        done();
      });
    });
  });
});
