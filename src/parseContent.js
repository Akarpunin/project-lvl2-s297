import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

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

export default getObject;
