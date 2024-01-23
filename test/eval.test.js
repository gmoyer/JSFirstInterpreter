const Getnodes = require("./../getnodes");
const Evaluator = require("./../evaluator");
let body ;

beforeAll( ()=>{
  const getNodes = new Getnodes();
  body = getNodes.parseProgram(getNodes.loadFile('test\\sample.js'));
  console.log(body[1].expression.arguments);
});

test('two nodes parsed ', ()=>{
  expect(body.length).toBe(2);
});
test('node of type VariableDeclaration', () => {
  const evaluator = new Evaluator();
  expect(evaluator.isTypeVariableDeclaration(body[0])).toBe(true);
  expect(evaluator.isTypeVariableDeclaration(body[1])).toBe(false);
});
test('Evaluator returns correct id "a"', () => {
  const evaluator = new Evaluator();
  const input = body[0];
  expect(evaluator.getIdentifier(input)).toBe('a');
});
test('Evaluator returns correct value "hello"', () => {
  const evaluator = new Evaluator();
  const input = body[0];
  expect(evaluator.getValue(input)).toBe('hello');
});
test('Evaluator returns correct list of variables as an array', () => {
  const evaluator = new Evaluator();
  const input = body[0];

  const out = evaluator.getVariable(input);

  expect(out.name).toBe('a');
  expect(out.value).toBe('hello');
});
test('If we call controller with a VariableDeclaration, then we expect a table entry with name and value' , () => {
  const evaluator = new Evaluator();
  const input = body[0];

  evaluator.controller(input);

  expect(evaluator.varTable[0].name).toBe('a');
  expect(evaluator.varTable[0].value).toBe('hello');
});
test('node of type ExpressionStatement', () => {
  const evaluator = new Evaluator();
  expect(evaluator.isTypeExpressionStatement(body[0])).toBe(false);
  expect(evaluator.isTypeExpressionStatement(body[1])).toBe(true);
});
test('If we give isPrintStatement a print expression statement, we expect it to return true', () => {
  const evaluator = new Evaluator();
  const input = body[1];

  expect(evaluator.isPrintStatement(input)).toBe(true);
});
test('If we call getExpressionVariableName expect it to treturn the name of the variable in expression', () => {
  const evaluator = new Evaluator();
  const input = body[1];

  expect(evaluator.getExpressionVariableName(input)).toBe('a');
});
test('If we call getVariableByName with "a", then we expect a Variable', () => {
  const evaluator = new Evaluator();

  evaluator.controller(body[0]); //put variable into table

  const out = evaluator.getVariableByName('a');

  expect(out.name).toBe('a');
  expect(out.value).toBe('hello');
});
test('If we call controller on an expression statement we expect it to print out its value', () => {
  const evaluator = new Evaluator();
  evaluator.controller(body[0]);
  evaluator.controller(body[1]);
});