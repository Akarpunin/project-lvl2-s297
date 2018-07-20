import yaml from 'js-yaml';
import ini from 'ini';

const parseContent = (fileContent, extension) => {
  const mapping = {
    '.json': file => JSON.parse(file),
    '.yml': file => yaml.safeLoad(file),
    '.ini': file => ini.parse(file),
  };
  return mapping[extension](fileContent);
};

export default parseContent;
