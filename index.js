const tokenize = require("./tokenizer");
const parse = require("./parser");
const transform = require("./transformer");
const codeGenerator = require("./generator");
const tokens = tokenize.tokenizer("(add 2 (subtract 4 2))");
const ast = parse.parser(tokens, 0);
const newAst = transform.transformer(ast);
const outPut = codeGenerator.generate(newAst);

console.log(outPut);
