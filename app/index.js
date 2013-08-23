'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ProtractorGenerator = module.exports = function ProtractorGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ProtractorGenerator, yeoman.generators.Base);

ProtractorGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      type: 'input',
      name: 'configName',
      message: 'Choose a name for the protractor configuration file',
      default: 'myConfig.js'
    }
  ];

  this.prompt(prompts, function(props) {
    this.configName = props.configName;
    cb();
  }.bind(this));
};

ProtractorGenerator.prototype.app = function app() {
  this.mkdir('spec');
};

ProtractorGenerator.prototype.projectfiles = function() {
  this.copy('configTemplate.js', 'myConfig.js');
};
