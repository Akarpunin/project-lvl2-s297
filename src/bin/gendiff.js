#!/usr/bin/env node

import genDiff, { program } from '..';

program.action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)));
program.parse(process.argv);

export default genDiff;
