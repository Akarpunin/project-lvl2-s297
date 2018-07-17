import program from 'commander';
import fs from 'fs';
import _ from 'lodash';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>');

const genDiff = (pathToFile1, pathToFile2) => {
  const obj1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf-8'));

  const reducedObject1 = Object.keys(obj1).reduce((acc, value) => {
    if (_.has(obj2, value)) {
      if (obj1[value] === obj2[value]) {
        acc.push(`  ${value}: ${obj1[value]}`);
        return acc;
      }
      acc.push(`+ ${value}: ${obj2[value]}`, `- ${value}: ${obj1[value]}`);
      return acc;
    }
    acc.push(`- ${value}: ${obj1[value]}`);
    return acc;
  }, ['{']);

  const reducedAll = Object.keys(obj2).reduce((acc, value) => {
    if (_.has(obj1, value)) {
      return acc;
    }
    acc.push(`+ ${value}: ${obj2[value]}`);
    return acc;
  }, reducedObject1).join('\n  ');

  return `${reducedAll}\n}`;
};

export default genDiff;
export { program };
