#!/usr/bin/env node

import program from 'commander';
import genDiff from '../parseContent';
// import { version } from '../../package.json';

program
  .version('1.0.10')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, args) =>
    console.log(genDiff(firstConfig, secondConfig, args.format)))
  .parse(process.argv);
