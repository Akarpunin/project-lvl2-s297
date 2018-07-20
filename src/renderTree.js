import _ from 'lodash';

const stringifyWithIndent = (node, indent) => {
  if (node instanceof Object) {
    const result = Object.keys(node).map((key) => {
      if (node[key] instanceof Object) {
        return `  ${key}: ${stringifyWithIndent(node[key], `${indent}  `)}`;
      }
      return `  ${key}: ${node[key]}`;
    });
    return `{\n${indent}  ${result.join(`\n${indent}  `)}\n${indent}}`;
  }
  return node;
};

const render = (ast) => {
  const iter = (node, indent) => {
    const stringify = value => stringifyWithIndent(value, `${indent}    `);
    const result = node.map((obj) => {
      const {
        name, oldValue, newValue, children,
      } = obj;
      if (children) {
        return `  ${name}: ${iter(children, `${indent}    `)}`;
      }
      if (oldValue && newValue) {
        if (oldValue === newValue) {
          return `  ${name}: ${stringify(oldValue)}`;
        }
        return [`+ ${name}: ${stringify(newValue)}`, `- ${name}: ${stringify(oldValue)}`];
      }
      if (oldValue) {
        return `- ${name}: ${stringify(oldValue)}`;
      }
      return `+ ${name}: ${stringify(newValue)}`;
    });
    return `{\n${indent}  ${_.flatten(result).join(`\n${indent}  `)}\n${indent}}`;
  };
  return iter(ast, '');
};

export default render;
