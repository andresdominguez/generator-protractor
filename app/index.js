'use strict';
var colors = require('colors');
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

    console.log('Done! Now follow these steps:'.bold);
    console.log('1. Generate a Protractor test:');
    console.log('yo protractor:unit test-name'.blue);
    console.log('\n2. Download the Protractor dependencies:');
    console.log('./node_modules/protractor/bin/install_selenium_standalone'.blue);
    console.log('\n3. Start the Selenium server:');
    console.log('./selenium/start'.blue);
    console.log('\n4. Run Protractor:');
    console.log(('./node_modules/protractor/bin/protractor ' + this.configName).blue);
    console.log('\nYou can read these instructions in README.txt\n');

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
