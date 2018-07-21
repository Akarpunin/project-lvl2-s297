import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import { renderTree, renderPlain, renderJson } from './render';
import getAst from './';

const parseContent = (content, extension) => {
  const mapping = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return mapping[extension](content);
};

const getObject = (pathToFile) => {
  const content = fs.readFileSync(pathToFile, 'utf-8');
  const extension = path.extname(pathToFile);
  return parseContent(content, extension);
};

const genDiff = (pathToFile1, pathToFile2, renderMethod = 'tree') => {
  const mapping = {
    tree: renderTree,
    plain: renderPlain,
    json: renderJson,
  };
  const obj1 = getObject(pathToFile1);
  const obj2 = getObject(pathToFile2);
  return mapping[renderMethod](getAst(obj1, obj2));
};

export default genDiff;
