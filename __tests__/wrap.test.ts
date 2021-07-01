import { TableRows } from '../src/interfaces';
import { Rows } from '../src/row';
import { wrap } from '../src/wrap';
import { repeatStr } from './helper';

describe('wrap() Test', () => {
  const padding = 2;
  const eleNum = 3;
  const max = 20;
  const maxColumnWidths = Array(eleNum).fill(max + padding * 2);

  function createSource(num: number = eleNum, cnt: number = max): TableRows {
    return Array(num)
      .fill(null)
      .map(() => Array(maxColumnWidths.length).fill(repeatStr(cnt)));
  }

  function dump(rows: Rows): TableRows {
    const result: TableRows = [];
    rows.current = rows.header;
    while (rows.current) {
      result.push(rows.current.data);
      rows.current = rows.current.next;
    }
    return result;
  }

  test('Should not wrap words (no changes)', () => {
    const source = createSource();
    const rows = new Rows(source);
    wrap(rows, maxColumnWidths, padding);
    const result = dump(rows);
    expect(result).toMatchObject(source);
  });

  test('Should wrap words in first column only', () => {
    const source = createSource();
    source[0][0] = repeatStr(max * 3);
    const expected = [
      Array(eleNum).fill(repeatStr(max)),
      [repeatStr(max), '', ''],
      [repeatStr(max), '', ''],
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max))
    ];

    const rows = new Rows(source);
    wrap(rows, maxColumnWidths, padding);
    const result = dump(rows);
    expect(result).toMatchObject(expected);
  });

  test('Should wrap words in first and second columns', () => {
    const source = createSource();
    source[0][0] = repeatStr(max * 3);
    source[0][1] = repeatStr(max * 4);
    const expected = [
      Array(eleNum).fill(repeatStr(max)),
      [repeatStr(max), repeatStr(max), ''],
      [repeatStr(max), repeatStr(max), ''],
      ['', repeatStr(max), ''],
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max))
    ];

    const rows = new Rows(source);
    wrap(rows, maxColumnWidths, padding);
    const result = dump(rows);
    expect(result).toMatchObject(expected);
  });

  test('Should wrap words in all columns', () => {
    const source = createSource();
    source[0][0] = repeatStr(max * 3);
    source[0][1] = repeatStr(max * 4);
    source[0][2] = repeatStr(max * 5);
    const expected = [
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max)),
      ['', repeatStr(max), repeatStr(max)],
      ['', '', repeatStr(max)],
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max))
    ];

    const rows = new Rows(source);
    wrap(rows, maxColumnWidths, padding);
    const result = dump(rows);
    expect(result).toMatchObject(expected);
  });

  test('Should wrap words in columns and rows', () => {
    const source = createSource();
    source[0][0] = repeatStr(max * 3);
    source[0][1] = repeatStr(max * 4);
    source[0][2] = repeatStr(max * 5);
    source[2][0] = repeatStr(max * 3);
    source[2][1] = repeatStr(max * 4);
    source[2][2] = repeatStr(max * 5);
    const expected = [
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max)),
      ['', repeatStr(max), repeatStr(max)],
      ['', '', repeatStr(max)],
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max)),
      Array(eleNum).fill(repeatStr(max)),
      ['', repeatStr(max), repeatStr(max)],
      ['', '', repeatStr(max)]
    ];

    const rows = new Rows(source);
    wrap(rows, maxColumnWidths, padding);
    const result = dump(rows);
    expect(result).toMatchObject(expected);
  });
});
