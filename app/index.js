'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

/** @type {string} The protractor version. */
var ptorVersion = '2.2.0';

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    this.log(chalk.magenta('Welcome to the protractor code generator.'));

    var prompts = [
      {
        type: 'input',
        name: 'configName',
        message: 'Choose a name for the protractor configuration file',
        default: 'protractor.conf.js'
      },
      {
        type: 'input',
        name: 'baseUrl',
        message: 'Choose a base URL',
        default: 'http://localhost:8000'
      },
      {
        type: 'list',
        name: 'browsers',
        message: 'Which browsers do you want to run?',
        default: 0,
        choices: ['Chrome', 'Firefox', 'Both, at the same time']
      }
    ];

    this.prompt(prompts, function(props) {
      this.configName = props.configName;
      this.baseUrl = props.baseUrl;
      this.browserCapabilities = props.browsers;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.mkdir('spec');
    },

    projectfiles: function() {
      this.ptorVersion = ptorVersion;

      this.copy(
        'configTemplate.js',
        this.configName
      );
      this.copy(
        'example_spec.js',
        'spec/example_spec.js'
      );
      this.template('package.json');
      this.copy('README.txt');
    }
  },

  install: function() {
    this.config.save();
    var self = this;
    this.installDependencies({
      bower: false,
      skipInstall: this.options['skip-install'],
      callback: function() {
        var readme = self.readFileAsString('README.txt');
        self.log('Done! Now follow these steps:');
        self.log(readme);
        self.log('You can read these instructions in README.txt');
      }
    });
  }
});
