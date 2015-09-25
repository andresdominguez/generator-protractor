# generator-protractor [![Build Status](https://secure.travis-ci.org/andresdominguez/generator-protractor.png?branch=master)](https://travis-ci.org/andresdominguez/generator-protractor)

A [Yeoman](http://yeoman.io) code generator for [Protractor](https://github.com/angular/protractor). Protractor is an end to end test framework for Angular applications built on top of webdriverJS.

It generates a node project with protractor **2.2.0**. The project includes a few sample tests.

## Getting Started

Make sure you have Yeoman installed.

```bash
$ npm install -g yo
```

To install generator-protractor from npm, run:

```bash
$ npm install -g generator-protractor
```

###Usage

Create a new directory where you want to add your integration tests and and cd into it:

```bash
$ mkdir my-protractor-project
$ cd my-protractor-project
```

Run the generator:

```bash
$ yo protractor
```

###Installing selenium and running the tests

You need to download selenium and start it in your local machine. Just run the following command:

```bash
$ ./node_modules/.bin/webdriver-manager update
```

Start the selenium standalone server with:

```bash
$ ./node_modules/.bin/webdriver-manager start
```

Open another terminal and run the integration tests:

```bash
$ ./node_modules/.bin/protractor protractor.conf.js
```

### Getting To Know Yeoman

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
