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

    var expectedFiles = [
      configFileName,
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'configName': configFileName
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function() {
      helpers.assertFiles(expectedFiles);
      done();
    });
  });
});
