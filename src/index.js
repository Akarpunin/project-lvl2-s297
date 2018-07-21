import getAst from './getAst';
import getRenderFunction from './rendering';
import getObject from './parseContent';

const genDiff = (pathToFile1, pathToFile2, renderMethod = 'tree') => {
  const obj1 = getObject(pathToFile1);
  const obj2 = getObject(pathToFile2);
  return getRenderFunction(renderMethod)(getAst(obj1, obj2));
};

export default genDiff;
