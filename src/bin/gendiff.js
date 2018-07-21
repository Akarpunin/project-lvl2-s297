#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, args) =>
    console.log(genDiff(firstConfig, secondConfig, args.format)))
  .parse(process.argv);
