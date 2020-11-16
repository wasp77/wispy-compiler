const traverseNode = (visitors, node, parent) => {
  let visitor = visitors[node.type];
  if (visitor && visitor.enter) {
    visitor.enter(node, parent);
  }
  if (node.type === "Program") {
    node.body.forEach((child) => {
      traverseNode(visitors, child, node);
    });
  }
  if (node.type === "CallExpression") {
    node.params.forEach((child) => {
      traverseNode(visitors, child, node);
    });
  }
  if (visitor && visitor.exit) {
    visitor.exit(node, parent);
  }
};

exports.traverseNode = traverseNode;
