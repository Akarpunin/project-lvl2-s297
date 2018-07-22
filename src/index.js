import fs from 'fs';
import path from 'path';
import getAst from './getAst';
import getRenderer from './renderers/';
import parseContent from './parseContent';

const genDiff = (pathToFile1, pathToFile2, renderMethod = 'tree') => {
  const content1 = fs.readFileSync(pathToFile1, 'utf-8');
  const content2 = fs.readFileSync(pathToFile2, 'utf-8');
  const extension = path.extname(pathToFile1);
  const obj1 = parseContent(content1, extension);
  const obj2 = parseContent(content2, extension);
  return getRenderer(renderMethod)(getAst(obj1, obj2));
};

export default genDiff;
