'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ProtractorGenerator = module.exports = function ProtractorGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  var self = this;

  this.on('end', function() {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install'],
      callback: function() {
        var readme = self.readFileAsString('README.txt');
        console.log('Done! Now follow these steps:\n');
        console.log(readme);
        console.log('\nYou can read these instructions in README.txt\n');
      }
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
      name: 'baseUrl',
      message: 'Choose a base URL',
      default: 'http://localhost:8000'
    }
  ];

  this.prompt(prompts, function(props) {
    this.configName = props.configName;
    this.baseUrl = props.baseUrl;
    cb();
  }.bind(this));
};

ProtractorGenerator.prototype.app = function app() {
  this.mkdir('spec');
};

ProtractorGenerator.prototype.createFiles = function() {
  this.copy('configTemplate.js', this.configName);
  this.copy('package.json');
  this.copy('example_spec.js', 'spec/example_spec.js');
  this.copy('README.txt');
};
