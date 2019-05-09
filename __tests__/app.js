'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const testOptions = {
  name: 'foo'
};

const defaultPkg = {
  name: 'foo',
  version: '1.0.0',
  description: '',
  author: ''
};

const existingPkg = {
  name: 'bar',
  version: '2.0.0',
  description: 'mything',
  author: 'me'
};

describe('jb-node:app', () => {
  describe('without existing package.json', () => {
    describe('without name', () => {
      beforeEach(() => {
        return helpers.run(path.join(__dirname, '../generators/app'));
      });

      it('does not set package name', () => {
        assert.noJsonFileContent('package.json', { name: testOptions.name });
      });
    });

    describe('with name', () => {
      beforeEach(() => {
        return helpers
          .run(path.join(__dirname, '../generators/app'))
          .withOptions(testOptions);
      });

      it('creates package.json', () => {
        assert.file('package.json');
      });

      it('creates .gitignore', () => {
        assert.file('.gitignore');
      });

      it('sets package name', () => {
        assert.jsonFileContent('package.json', { name: testOptions.name });
      });

      it('sets defaults in package.json', () => {
        assert.jsonFileContent('package.json', defaultPkg);
      });
    });
  });

  describe('with existing package.json', () => {
    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withOptions(testOptions)
        .on('ready', gen => {
          gen.fs.writeJSON(gen.destinationPath('package.json'), existingPkg);
          gen.fs.write(gen.destinationPath('.gitignore'), 'foo');
        });
    });

    it('preserves existing values in package.json', () => {
      assert.jsonFileContent('package.json', existingPkg);
    });

    it('overwrites values in gitignore', () => {
      assert.fileContent('.gitignore', 'node_modules');
    });
  });
});
