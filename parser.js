const getNode = (token) => {
  if (token.type === "string") {
    return {
      type: "StringLiteral",
      value: token.value,
    };
  }

  if (token.type === "number") {
    return {
      type: "NumberLiteral",
      value: token.value,
    };
  }
  if (token.type === "name") {
    return {
      type: "CallExpression",
      name: token.value,
      params: [],
    };
  }
  throw "Unrecognized token";
};

/**
 * take in the array of tokens and create an AST
 * Shape of the AST:
 * {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2',
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4',
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2',
 *         }]
 *       }]
 *     }]
 *   }
 */
function parser(tokens, index) {
  let ast = {
    type: "Program",
    body: [],
  };
  // When we hit a call expression push to the stack when we hit a closed paran pop off the stack until we hit the call expression.
  const stack = [];
  let rootNode;
  while (index < tokens.length) {
    let token = tokens[index];
    if (token.value === ")") {
      let params = [];
      let param = stack.pop();
      while (param.type !== "CallExpression") {
        params = [...params, param];
        param = stack.pop();
      }
      param["params"] = [...params];
      if (rootNode) {
        param["params"].push(rootNode);
      }
      rootNode = param;
    } else {
      if (token.value !== "(") {
        let node = getNode(token);
        stack.push(node);
      }
    }
    index++;
  }
  ast.body = [rootNode];
  return ast;
}

exports.parser = parser;
