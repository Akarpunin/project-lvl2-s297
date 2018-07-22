import _ from 'lodash';

const nodeTypes = [
  {
    type: 'parent',
    check: (key, obj1, obj2) => ((_.has(obj1, key) && _.has(obj2, key)) &&
      ((obj1[key] instanceof Object) && (obj2[key] instanceof Object))),
    process: (obj1, obj2, func) => ({ children: func(obj1, obj2) }),
  },
  {
    type: 'unchanged',
    check: (key, obj1, obj2) => ((_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] === obj2[key])),
    process: obj1 => ({ oldValue: obj1, newValue: obj1 }),
  },
  {
    type: 'changed',
    check: (key, obj1, obj2) => ((_.has(obj1, key) && _.has(obj2, key)) &&
      (obj1[key] !== obj2[key])),
    process: (obj1, obj2) => ({ oldValue: obj1, newValue: obj2 }),
  },
  {
    type: 'deleted',
    check: (key, obj1, obj2) => (_.has(obj1, key) && !_.has(obj2, key)),
    process: obj1 => ({ oldValue: obj1 }),
  },
  {
    type: 'added',
    check: (key, obj1, obj2) => (!_.has(obj1, key) && _.has(obj2, key)),
    process: (obj1, obj2) => ({ newValue: obj2 }),
  },
];

const getAst = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const { type, process } = nodeTypes.find(element => element.check(key, obj1, obj2));
    const result = process(obj1[key], obj2[key], getAst);
    return { name: key, type, ...result };
  });
};

export default getAst;
