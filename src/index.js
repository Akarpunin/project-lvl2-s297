import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const obj1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));

  const arrayOfKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const arrayOfDiff = arrayOfKeys.map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return `  ${key}: ${obj1[key]}`;
      }
      return [`+ ${key}: ${obj2[key]}`, `- ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key)) {
      return `- ${key}: ${obj1[key]}`;
    }
    return `+ ${key}: ${obj2[key]}`;
  });
  const result = _.flatten(arrayOfDiff).join('\n  ');
  return `{\n  ${result}\n}`;
};

export default genDiff;
