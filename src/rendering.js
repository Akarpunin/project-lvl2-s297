import _ from 'lodash';

const stringify = (node, indent) => {
  if (node instanceof Object) {
    const result = Object.keys(node).map((key) => {
      if (node[key] instanceof Object) {
        return `  ${key}: ${stringify(node[key], `${indent}    `)}`;
      }
      return `  ${key}: ${node[key]}`;
    });
    return `{\n${indent}  ${result.join(`\n${indent}  `)}\n${indent}}`;
  }
  return node;
};

const stringifyPlain = node => ((node instanceof Object) ? 'complex value' : `'${node}'`);

const nodeTypes = [
  {
    type: 'parent',
    processTree: (node, indent, func) => `  ${node.name}: ${func(node.children, indent)}`,
    processPlain: (node, acc, func) => func(node.children, `${acc}${node.name}.`),
  },
  {
    type: 'not changed',
    processTree: (node, indent) => `  ${node.name}: ${stringify(node.oldValue, indent)}`,
    processPlain: () => '',
  },
  {
    type: 'changed',
    processTree: (node, indent) => [`+ ${node.name}: ${stringify(node.newValue, indent)}`, `- ${node.name}: ${stringify(node.oldValue, indent)}`],
    processPlain: (node, acc) => `${acc}${node.name}' was updated. From ${stringifyPlain(node.oldValue)} to ${stringifyPlain(node.newValue)}`,
  },
  {
    type: 'deleted',
    processTree: (node, indent) => `- ${node.name}: ${stringify(node.oldValue, indent)}`,
    processPlain: (node, acc) => `${acc}${node.name}' was removed`,
  },
  {
    type: 'added',
    processTree: (node, indent) => `+ ${node.name}: ${stringify(node.newValue, indent)}`,
    processPlain: (node, acc) => `${acc}${node.name}' was added with value: ${stringifyPlain(node.newValue)}`,
  },
];

const renderTree = (ast, indent = '') => {
  const result = ast.map(obj =>
    nodeTypes.find(element => (element.type === obj.type)).processTree(obj, `${indent}    `, renderTree));
  return `{\n${indent}  ${_.flatten(result).join(`\n${indent}  `)}\n${indent}}`;
};

const renderPlain = (ast, acc = 'Property \'') => {
  const result = ast.map(obj =>
    nodeTypes.find(element => (element.type === obj.type)).processPlain(obj, acc, renderPlain));
  return result.filter(value => (value !== '')).join('\n');
};

const renderJson = ast => JSON.stringify(ast);

const getRenderFunction = (renderMethod) => {
  const mapping = {
    tree: renderTree,
    plain: renderPlain,
    json: renderJson,
  };
  return mapping[renderMethod];
};

export default getRenderFunction;
