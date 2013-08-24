'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fileUtils = require('../util.js');
var path = require('path');


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
      break;
  }

  var testDir = 'spec';
  this.fileName = path.join(testDir, this.name + 'Spec.js');
  this.copy(templateName, this.fileName);
};

UnitGenerator.prototype.addTestToConfig = function() {
  var testString = '\'' + this.fileName + '\',';
  try {
    // Add the unit test to the protractor configuration file.
    var fullPath = path.join('myConfig.js');
    fileUtils.rewriteFile({
      file: fullPath,
      needle: '// end-tests.',
      splicable: [
        testString
      ]
    });
  } catch (e) {
    console.log('\nUnable to find ' + fullPath + '. Reference to ' + testString + ' not added.\n');
  }
};
