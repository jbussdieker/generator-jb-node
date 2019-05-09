'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

const existingPkg = {
  dont: 'touch'
};

describe('jb-node:app', () => {
  describe('without existing package.json', () => {
    describe('with name', () => {
      beforeEach(() => {
        return helpers
          .run(path.join(__dirname, '../generators/app'))
          .withPrompts({ name: 'foo' });
      });

      it('creates files', () => {
        assert.file(['package.json', '.gitignore']);
      });
    });

    describe('without name', () => {
      beforeEach(() => {
        return helpers.run(path.join(__dirname, '../generators/app'));
      });

      it('uses appname', () => {
        const content = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        assert(content.name !== 'null');
        assert(content.name !== undefined);
      });
    });
  });

  describe('with existing package.json', () => {
    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({ name: 'foo' })
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
