import { Renderer } from '../src/renderer';
import { Row, Rows } from '../src/row';

describe('Renderer Test', () => {
  const eleNum = 3;
  const maxColumnWidths = Array(eleNum).fill(3);

  describe('Render header', () => {
    test('With simple style', () => {
      const expected = ' A  A  A\n    A  A\n---------\n';

      const renderer = new Renderer('simple');
      const rows = new Rows();
      rows.header = new Row(['A', 'A', 'A']);
      rows.header.next = new Row(['', 'A', 'A'], true);
      const result = renderer['renderHeader'](rows, maxColumnWidths);
      expect(result).toBe(expected);
    });

    test('With grid style', () => {
      const expected = '| A | A | A |\n|   | A | A |\n+===+===+===+\n';

      const renderer = new Renderer('grid');
      const rows = new Rows();
      rows.header = new Row(['A', 'A', 'A']);
      rows.header.next = new Row(['', 'A', 'A'], true);
      const result = renderer['renderHeader'](rows, maxColumnWidths);
      expect(result).toBe(expected);
    });
  });

  describe('Render rows', () => {
    test('With simple style', () => {
      const expected = ' A  A  A\n    A  A\n A  A  A\n';

      const renderer = new Renderer('simple');
      const rows = new Rows();
      rows.header = new Row(['A', 'A', 'A']);
      rows.header.next = new Row(['', 'A', 'A'], true);
      rows.add(['A', 'A', 'A']);
      rows.current = rows.header;
      const result = renderer['renderRows'](rows, maxColumnWidths);
      expect(result).toBe(expected);
    });

    test('With grid style', () => {
      const expected =
        '| A | A | A |\n|   | A | A |\n+---+---+---+\n| A | A | A |\n+---+---+---+\n';

      const renderer = new Renderer('grid');
      const rows = new Rows();
      rows.header = new Row(['A', 'A', 'A']);
      rows.header.next = new Row(['', 'A', 'A'], true);
      rows.add(['A', 'A', 'A']);
      rows.current = rows.header;
      const result = renderer['renderRows'](rows, maxColumnWidths);
      expect(result).toBe(expected);
    });
  });
});
