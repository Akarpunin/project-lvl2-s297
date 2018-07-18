import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

const getObject = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  if (path.extname(pathToFile) === '.json') {
    return JSON.parse(fileContent);
  }
  return yaml.safeLoad(fileContent);
};

const genDiff = (pathToFile1, pathToFile2) => {
  const obj1 = getObject(pathToFile1);
  const obj2 = getObject(pathToFile2);
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
  return `{\n  ${result}\n}\n`;
};

export default genDiff;
