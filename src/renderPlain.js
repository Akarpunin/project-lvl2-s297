
const stringify = node => ((node instanceof Object) ? 'complex value' : `'${node}'`);

const render = (ast) => {
  const iter = (node, acc) => {
    const result = node.map((obj) => {
      const {
        name, oldValue, newValue, children,
      } = obj;
      if (children) {
        return iter(children, `${acc}${name}.`);
      }
      if (oldValue && newValue) {
        if (oldValue === newValue) {
          return '';
        }
        return `${acc}${name}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      }
      if (oldValue) {
        return `${acc}${name}' was removed`;
      }
      return `${acc}${name}' was added with value: ${stringify(newValue)}`;
    });
    return result.filter(value => (value !== '')).join('\n');
  };
  return iter(ast, 'Property \'');
};

export default render;
