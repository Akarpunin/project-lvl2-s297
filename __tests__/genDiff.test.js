import fs from 'fs';
import genDiff from '../src/';

test('test', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const expected = fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8');
  expect(genDiff(pathToFile1, pathToFile2)).toBe(expected);
});
