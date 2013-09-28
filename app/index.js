'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ProtractorGenerator = module.exports = function ProtractorGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ProtractorGenerator, yeoman.generators.Base);

ProtractorGenerator.prototype.askForConfigName = function() {
  var cb = this.async();

  console.log('Welcome to the protractor code generator.\n');

  var prompts = [
    {
      type: 'input',
      name: 'configName',
      message: 'Choose a name for the protractor configuration file',
      default: 'protractor-config.js'
    },
    {
      type: 'input',
      name: 'timeout',
      message: 'Choose a default timeout (in milliseconds) for the tests',
      default: 5000
    }
  ];

  this.prompt(prompts, function(props) {
    this.configName = props.configName;
    this.timeout = props.timeout;
    cb();
  }.bind(this));
};

ProtractorGenerator.prototype.app = function app() {
  this.mkdir('spec');
};

ProtractorGenerator.prototype.createFiles = function() {
  this.copy('configTemplate.js', this.configName);
  this.copy('package.json');
  this.copy('README.txt');
};

ProtractorGenerator.prototype.todo = function() {
  console.log('\nDone! To add a test type yo protractor:unit test-name');
};
