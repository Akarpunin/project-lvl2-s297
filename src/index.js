import _ from 'lodash';
import getObject from './getObject';

const getAst = (obj1, obj2) => {
  const arrayOfKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  return arrayOfKeys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if ((obj1[key] instanceof Object) && (obj2[key] instanceof Object)) {
        return { name: key, children: getAst(obj1[key], obj2[key]) };
      }
      return { name: key, oldValue: obj1[key], newValue: obj2[key] };
    }
    if (_.has(obj1, key)) {
      return { name: key, oldValue: obj1[key] };
    }
    return { name: key, newValue: obj2[key] };
  });
};

const stringify = (value) => {
  if (value instanceof Object) {
    return JSON.stringify(value);
  }
  return value;
};

const render = (ast, indent) => {
  const result = ast.map((obj) => {
    const {
      name, oldValue, newValue, children,
    } = obj;
    if (children) {
      return `  ${name}: ${render(children, `${indent}    `)}`;
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

const genDiff = (pathToFile1, pathToFile2) => {
  const obj1 = getObject(pathToFile1);
  const obj2 = getObject(pathToFile2);
  return render(getAst(obj1, obj2), '');
};

export default genDiff;
