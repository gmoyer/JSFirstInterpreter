class Evaluator{
  varTable = [];
  isTypeVariableDeclaration(node) {
    return node.type == 'VariableDeclaration';
  }
  getIdentifier(node) {
    return node.declarations[0].id.name;
  }
  getValue(node){
    return node.declarations[0].init.value;
  }
  getVariable(node) {
    return new Variable(this.getIdentifier(node), this.getValue(node));
  }
  controller(node){
    if(this.isTypeVariableDeclaration(node)){
      this.fillTable(node);
    }
    if (this.isTypeExpressionStatement(node)) {
      if (this.isPrintStatement(node)) {
        this.printVariable(this.getVariableByName(this.getExpressionVariableName(node)));
      }
    }
  }
  fillTable(node) {
    if (this.varTable != null) {
      this.varTable.push(this.getVariable(node));
    }
  }
  isTypeExpressionStatement(node){
    return node.type == 'ExpressionStatement';
  }
  isPrintStatement(node) {
    return node.expression.callee.name == 'print';
  }
  getExpressionVariableName(node){
    return node.expression.arguments[0].name;
  }
  getVariableByName(name) {
    return this.varTable.find(variable => variable.name == name);
  }
  printVariable(variable){
    console.log(variable.value);
  }
}

class Variable {
  name;
  value;

  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

module.exports=Evaluator;