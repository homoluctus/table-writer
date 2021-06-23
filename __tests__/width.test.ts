import { Rows } from '../src/row';
import { Width } from '../src/width';

describe('Width Test', () => {
  function repeatStr(num: number): string {
    return 'A'.repeat(num);
  }

  test('Compute max columns', () => {
    const expected = [10, 20, 30];
    const source = [
      [repeatStr(4), repeatStr(20), repeatStr(29)],
      [repeatStr(10), repeatStr(19), repeatStr(20)],
      [repeatStr(9), repeatStr(10), repeatStr(30)]
    ];
    const rows = new Rows(source);
    const width = new Width();
    width.compute(rows);
    expect(width.maxColumnWidths).toMatchObject(expected);
  });

  test('Compute max columns with padding', () => {
    const padding = 4;
    const expected = [10, 20, 30].map((v) => v + padding * 2);
    const source = [
      [repeatStr(4), repeatStr(20), repeatStr(29)],
      [repeatStr(10), repeatStr(19), repeatStr(20)],
      [repeatStr(9), repeatStr(10), repeatStr(30)]
    ];
    const rows = new Rows(source);
    const width = new Width();
    width.compute(rows, padding);
    expect(width.maxColumnWidths).toMatchObject(expected);
  });

  test('shrink() returns true', () => {
    const width = new Width(30);
    width['_maxColumnWidths'] = [20, 20, 20];
    const expectedColumnWidths = [10, 10, 10];
    expect(width.shrink()).toBeTruthy();
    expect(width.maxColumnWidths).toMatchObject(expectedColumnWidths);
  });

  test('shrink() returns false', () => {
    const width = new Width(30);
    const expectedColumnWidths = [10, 10, 10];
    width['_maxColumnWidths'] = expectedColumnWidths;
    expect(width.shrink()).toBeFalsy();
    expect(width.maxColumnWidths).toMatchObject(expectedColumnWidths);
  });
});
