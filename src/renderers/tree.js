import _ from 'lodash';

const valueTypes = [
  {
    check: (node, key) => (node[key] instanceof Object),
    process: (node, key, indent, func) => `  ${key}: ${func(node[key], `${indent}    `)}`,
  },
  {
    check: (node, key) => (!(node[key] instanceof Object)),
    process: (node, key) => `  ${key}: ${node[key]}`,
  },
];

const stringify = (node, indent) => {
  if (!(node instanceof Object)) {
    return node;
  }
  const result = Object.keys(node).map(key =>
    valueTypes.find(element => (element.check(node, key))).process(node, key, indent, stringify));
  return `{\n${indent}  ${result.join(`\n${indent}  `)}\n${indent}}`;
};

const nodeTypes = [
  {
    type: 'parent',
    process: (node, indent, func) => `  ${node.name}: ${func(node.children, indent)}`,
  },
  {
    type: 'not changed',
    process: (node, indent) => `  ${node.name}: ${stringify(node.oldValue, indent)}`,
  },
  {
    type: 'changed',
    process: (node, indent) => [`+ ${node.name}: ${stringify(node.newValue, indent)}`, `- ${node.name}: ${stringify(node.oldValue, indent)}`],
  },
  {
    type: 'deleted',
    process: (node, indent) => `- ${node.name}: ${stringify(node.oldValue, indent)}`,
  },
  {
    type: 'added',
    process: (node, indent) => `+ ${node.name}: ${stringify(node.newValue, indent)}`,
  },
];

const render = (ast, indent = '') => {
  const result = ast.map(obj =>
    nodeTypes.find(element => (element.type === obj.type)).process(obj, `${indent}    `, render));
  return `{\n${indent}  ${_.flatten(result).join(`\n${indent}  `)}\n${indent}}`;
};

export default render;
