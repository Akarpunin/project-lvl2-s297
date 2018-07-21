import fs from 'fs';
import genDiff from '../src/';

test('test json', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const expected = (fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8')).trim();
  expect(genDiff(pathToFile1, pathToFile2, 'tree')).toBe(expected);
});

test('test yaml', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.yml';
  const pathToFile2 = '__tests__/__fixtures__/after.yml';
  const expected = (fs.readFileSync('__tests__/__fixtures__/expected', 'utf-8')).trim();
  expect(genDiff(pathToFile1, pathToFile2, 'tree')).toBe(expected);
});

test('test ini', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.ini';
  const pathToFile2 = '__tests__/__fixtures__/after.ini';
  const expected = (fs.readFileSync('__tests__/__fixtures__/expectedIni', 'utf-8')).trim();
  expect(genDiff(pathToFile1, pathToFile2, 'tree')).toBe(expected);
});

test('test json plain', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const expected = (fs.readFileSync('__tests__/__fixtures__/expectedPlain', 'utf-8')).trim();
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(expected);
});

test('test json json', () => {
  const pathToFile1 = '__tests__/__fixtures__/before.json';
  const pathToFile2 = '__tests__/__fixtures__/after.json';
  const expected = (fs.readFileSync('__tests__/__fixtures__/expectedJson', 'utf-8')).trim();
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toBe(expected);
});
