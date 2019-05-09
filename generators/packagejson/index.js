'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      required: true,
      default: this.determineAppname(),
      description: 'The package name'
    });
    this.option('version', {
      type: String,
      default: '0.0.0',
      description: 'The package version'
    });
    this.option('description', {
      type: String,
      default: '',
      description: 'The package description'
    });
    this.option('author', {
      type: String,
      default: '',
      description: 'The package author'
    });
    this.option('target', {
      type: String,
      required: false,
      default: 'package.json',
      description: 'Target filename to write the package config'
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath(this.options.target), {
      name: this.options.name,
      version: this.options.version,
      description: this.options.description,
      author: this.options.author
    });
    this.fs.writeJSON(this.destinationPath(this.options.target), pkg);
  }
};
