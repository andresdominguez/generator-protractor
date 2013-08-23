'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var UnitGenerator = module.exports = function UnitGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the unit subgenerator with the argument ' + this.name + '.');
};

util.inherits(UnitGenerator, yeoman.generators.NamedBase);

UnitGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
