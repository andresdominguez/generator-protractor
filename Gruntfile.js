'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        'unit/**/*.js',
        'test/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    mochacli: {
      options: {
        bail: true
      },
      all: ['test/*.js']
    },
    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'app/**/*.js',
          'unit/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['jshint', 'mochacli'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['mochacli']);
};
