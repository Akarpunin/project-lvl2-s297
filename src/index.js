import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseContent from './parseContent';
import renderTree from './renderTree';
import renderPlain from './renderPlain';

const getAst = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
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

const genDiff = (pathToFile1, pathToFile2, renderMethod = 'tree') => {
  const render = method => ((method === 'plain') ? renderPlain : renderTree);
  const getObject = (pathToFile) => {
    const content = fs.readFileSync(pathToFile, 'utf-8');
    const extension = path.extname(pathToFile);
    return parseContent(content, extension);
  };
  const obj1 = getObject(pathToFile1);
  const obj2 = getObject(pathToFile2);
  return render(renderMethod)(getAst(obj1, obj2));
};

export default genDiff;
