'use strict';

var assert = require('assert');
var esformatter = require('esformatter');
var fs = require('fs');
var plugin = require('..');

describe('esformatter-remove-object-spaces', function() {
  beforeEach(function() {
    esformatter.register(plugin);
    this.config = { preset: 'default' };
  });

  it('should remove remove a space between braces', function() {
    var output = esformatter.format(readfile('fixtures/empty-braces.js'));
    assert.equal(output, readfile('expected/empty-braces.js'));
  });

  it('properly formats objects with keys', function() {
    var output = esformatter.format(readfile('fixtures/object-with-keys.js'));
    assert.equal(output, readfile('expected/object-with-keys.js'));
  })
});

function readfile(name) {
  return fs.readFileSync('test/' + name).toString();
}
