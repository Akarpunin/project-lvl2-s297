
const stringify = node => ((node instanceof Object) ? 'complex value' : `'${node}'`);

const nodeTypes = [
  {
    type: 'parent',
    process: (node, acc, func) => func(node.children, `${acc}${node.name}.`),
  },
  {
    type: 'changed',
    process: (node, acc) => `${acc}${node.name}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
  },
  {
    type: 'deleted',
    process: (node, acc) => `${acc}${node.name}' was removed`,
  },
  {
    type: 'added',
    process: (node, acc) => `${acc}${node.name}' was added with value: ${stringify(node.newValue)}`,
  },
];

const render = (ast, acc = 'Property \'') => {
  const result = ast.filter(obj => (obj.type !== 'not changed')).map(obj =>
    nodeTypes.find(element => (element.type === obj.type)).process(obj, acc, render));
  return result.join('\n');
};

export default render;
