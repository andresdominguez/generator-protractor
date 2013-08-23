'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var UnitGenerator = module.exports = function UnitGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(UnitGenerator, yeoman.generators.NamedBase);

UnitGenerator.prototype.info = function() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

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

  this.copy(templateName, this.name + '.js');
};
