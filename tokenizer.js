/**
 * We're gonna start off with our first phase of parsing, lexical analysis, with
 * the tokenizer.
 *
 * We're just going to take our string of code and break it down into an array
 * of tokens.
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */
function tokenizer(input) {
  const numberRegex = /[0-9]/;
  const whitespaceRegex = /\s/;
  let tokens = [];
  let latestNumVal = "";
  let latestString = "";
  let stringStarted = false;
  let latestName = "";
  /**
   * The first step is to break the input into recognized tokens
   * Tokens: '(', ')', 'add', 'subtract', '<any numbers>', '"', ''
   * strings sttart and end with a  ' or "
   */
  [...input].forEach((char) => {
    if (char === "(" || char === ")") {
      // Either the beginning or the end of a list
      // If we were building a name add it as a token
      if (latestName) {
        tokens = [...tokens, { type: "name", value: latestName }];
        latestName = "";
      }
      // If we were building a number add it as a token
      if (latestNumVal) {
        tokens = [...tokens, { type: "number", value: latestNumVal }];
        latestNumVal = "";
      }
      tokens = [...tokens, { type: "paren", value: char }];
    } else if (numberRegex.test(char)) {
      // It's a number keep building the latest number
      latestNumVal += char;
    } else if (char === '"' || char === "'") {
      // We are either starting or ending a string
      if (latestString) {
        tokens = [...tokens, { type: "string", value: latestString }];
        latestString = "";
        stringStarted = false;
      } else {
        stringStarted = true;
      }
    } else if (stringStarted) {
      //We are in the middle of a string token
      latestString += char;
    } else if (!whitespaceRegex.test(char) && !stringStarted) {
      // We are building a name
      latestName += char;
    } else {
      // White space
      // If we were building a name add it as a token
      if (latestName) {
        tokens = [...tokens, { type: "name", value: latestName }];
        latestName = "";
      }
      // If we were building a number add it as a token
      if (latestNumVal) {
        tokens = [...tokens, { type: "number", value: latestNumVal }];
        latestNumVal = "";
      }
    }
  });
  return tokens;
}

exports.tokenizer = tokenizer;
