const generate = (node) => {
  switch (node.type) {
    case "Program":
      return node.body.map(generate).join("\n");
    case "ExpressionStatement":
      return generate(node.expression) + ";";
    case "CallExpression":
      return (
        generate(node.callee) +
        "(" +
        node.arguments.map(generate).join(", ") +
        ")"
      );
    case "Identifier":
      return node.name;
    case "NumberLiteral":
      return node.value;
    case "StringLiteral":
      return '"' + node.value + '"';
    default:
      throw "Unrecognized Node";
  }
};

exports.generate = generate;
