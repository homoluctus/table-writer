import { Table } from '../src/index';
import { loadFixture, repeatStr } from './helper';

describe('Table Test', () => {
  test('With simple style', () => {
    const maxWidth = 50;
    const source = [
      [repeatStr(1), repeatStr(9), repeatStr(10)],
      [repeatStr(11), repeatStr(19), repeatStr(20)],
      [repeatStr(21), repeatStr(29), repeatStr(30)]
    ];
    const expected = loadFixture('table/simple.txt');
    const table = new Table(source, { width: maxWidth });
    expect(table.write()).toBe(expected);
  });

  test('With grid style', () => {
    const maxWidth = 50;
    const source = [
      [repeatStr(1), repeatStr(9), repeatStr(10)],
      [repeatStr(11), repeatStr(19), repeatStr(20)],
      [repeatStr(21), repeatStr(29), repeatStr(30)]
    ];
    const expected = loadFixture('table/grid.txt');
    const table = new Table(source, { style: 'grid', width: maxWidth });
    expect(table.write()).toBe(expected);
  });

  test('Guarantee minimun column width', () => {
    const maxWidth = 10;
    const source = [
      [repeatStr(1), repeatStr(9), repeatStr(10)],
      [repeatStr(11), repeatStr(19), repeatStr(20)],
      [repeatStr(21), repeatStr(29), repeatStr(30)]
    ];
    const expected = loadFixture('table/simple_min_cell_width.txt');
    const table = new Table(source, { width: maxWidth });
    expect(table.write()).toBe(expected);
  });
});
