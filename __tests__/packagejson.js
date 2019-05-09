'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');

describe('generator-jb-node:packagejson', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/packagejson'));
  });

  it('creates a package.json', () => {
    assert.file(['package.json']);
  });

  describe('end-to-end', () => {
    const tests = ['test-001', 'test-002'];
    for (let i = 0; i < tests.length; i++) {
      describe(tests[i], () => {
        beforeAll(() => {
          return helpers
            .run(path.join(__dirname, '../generators/packagejson'))
            .withOptions(require(`./fixtures/${tests[i]}/options`));
        });

        it('matches spec', () => {
          assert.fileContent(
            'package.json',
            fs.readFileSync(
              path.resolve(__dirname, `fixtures/${tests[i]}/package.json`),
              'UTF-8'
            )
          );
        });
      });
    }
  });
});
