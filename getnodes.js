const acorn = require("acorn");
const fs = require('fs')

class getnodes{
  loadFile(filename) {
    return fs.readFileSync(filename, {encoding:'utf8', flag:'r'}).toString();
  }
  parseProgram(program) {
    return acorn.parse(program, {ecmaVersion: 2020}).body;
  }
}
module.exports = getnodes