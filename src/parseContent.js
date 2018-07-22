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

export default parseContent;
