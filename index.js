var tk = require('rocambole-token');
var rocambole = require('rocambole');

module.exports = {
  transformAfter: function(ast) {
    rocambole.recursive(ast, transform);
  }
};

function transform(node) {
  if (node.type != 'ObjectExpression') return;

  var token = node.startToken;

  if (isOpeningCurlyBracket(token) && shouldRemoveSpaces(token.next)) {
    removeSpaces(token.next);
  }
}

function tokenBefore(token) {
  if (isOpeningCurlyBracket(token) && shouldRemoveSpaces(token.next)) {
    removeSpaces(token.next);
  }
}

function removeSpaces(token) {
  while(token.type == 'WhiteSpace') {
    tk.remove(token);
    token = token.next
  }
}

function shouldRemoveSpaces(token) {
  if (isClosingCurlyBracket(token)) {
    return true;
  }

  if (token.type == 'WhiteSpace') {
    return shouldRemoveSpaces(token.next)
  }

  return false;
}

function isOpeningCurlyBracket(token) {
  return token && token.type === 'Punctuator' && token.value === '{'
}

function isClosingCurlyBracket(token) {
  return token && token.type === 'Punctuator' && token.value === '}'
}
