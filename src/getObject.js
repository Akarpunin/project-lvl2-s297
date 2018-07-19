import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  '.json': file => JSON.parse(file),
  '.yml': file => yaml.safeLoad(file),
  '.ini': file => ini.parse(file),
};

const getObject = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf-8');
  const extension = path.extname(pathToFile);
  return mapping[extension](fileContent);
};

export default getObject;
