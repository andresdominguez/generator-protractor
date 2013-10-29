'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ProtractorGenerator = module.exports = function ProtractorGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  var configName = this.configName;

  this.on('end', function() {
    this.installDependencies({
      bower: false,
      skipInstall: options['skip-install'],
      callback: function() {
        console.log('Done! Now follow these steps:');
        console.log('1. Download the Protractor dependencies:');
        console.log('./node_modules/protractor/bin/install_selenium_standalone');
        console.log('\n2. Start the Selenium server:');
        console.log('./selenium/start');
        console.log('\n3. Open a new terminal and run Protractor:');
        console.log('./node_modules/protractor/bin/protractor ' + configName);
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
