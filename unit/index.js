'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../util.js');
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

  this.fileName = this.name + 'Spec.js';
  this.copy(templateName, this.fileName);

  this._addScriptToIndex('\'' + this.fileName + '\',');
};

UnitGenerator.prototype._addScriptToIndex = function(script) {
  try {
    var fullPath = path.join('myConfig.js');
    angularUtils.rewriteFile({
      file: fullPath,
      needle: '// end-tests.',
      splicable: [
        script
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};
