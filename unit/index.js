'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fileUtils = require('../util.js');
var path = require('path');
var fs = require('fs');


var UnitGenerator = module.exports = function UnitGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(UnitGenerator, yeoman.generators.NamedBase);

UnitGenerator.prototype.info = function() {
  var cb = this.async();

  var prompts = [
    {
      type: 'list',
      name: 'testType',
      choices: [
        'protractor',
        'jasmine'
      ],
      message: 'What kind of test would you like to generate?',
      default: true
    }
  ];

  this.prompt(prompts, function(props) {
    this.testType = props.testType;
    cb();
  }.bind(this));
};

UnitGenerator.prototype.files = function files() {
  var templateName;
  switch (this.testType) {
    case 'protractor':
      templateName = 'protractorTemplate.js';
      break;
    case 'jasmine':
      templateName = 'jasmineTemplate.js';
      break;
  }

  var testDir = 'spec';
  this.fileName = path.join(testDir, this.name + '-spec.js');
  this.copy(templateName, this.fileName);
};

/** Check if the protractor configuration file is present. */
UnitGenerator.prototype.checkConfigExists = function() {
  this.configFileName = 'protractorConfig.js';

  if (!fs.existsSync(this.configFileName)) {
    console.log('Couldn\'t find config file ' + this.configFileName);
    this._askConfigFileName();
  }
};

/**
 * Ask for the prototype configuration file name.
 * @private
 */
UnitGenerator.prototype._askConfigFileName = function() {
  var cb = this.async();

  var prompt = {
    type: 'input',
    name: 'configFileName',
    message: 'Enter the name for the protractor configuration file'
  };

  this.prompt(prompt, function(props) {
    this.configFileName = props.configFileName;
    cb();
  }.bind(this));
};

UnitGenerator.prototype.addTestToConfig = function() {
  // Add the unit test to the config file if you chose protractor.
  if (this.testType !== 'protractor') {
    return;
  }

  var testString = '\'' + this.fileName + '\',';
  try {
    // Add the unit test to the protractor configuration file.
    fileUtils.rewriteFile({
      file: this.configFileName,
      needle: '// end-tests.',
      splicable: [
        testString
      ]
    });
  } catch (e) {
    console.log('\nUnable to find ' + this.configFileName + '. Reference to ' + testString + ' not added.\n');
  }
};
