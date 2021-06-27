import { TableStyle, TableFormat, TableLine, TableRow } from './interfaces';
import { Row, Rows } from './row';
import { styles } from './style';

export class Renderer {
  readonly newline: string = '\n';
  readonly padding: number;
  readonly chars: {
    betweenHeaderAndRows: TableLine;
    line: TableLine;
    row: { begin: string; sep: string; end: string };
  };

  constructor(style: TableStyle = 'simple', fmt?: TableFormat) {
    if (!fmt) {
      fmt = styles[style];
    }
    this.padding = fmt.padding;
    this.chars = fmt.chars;
  }

  render(rows: Rows, maxColumnWidths: number[]): string {
    let result = this.renderLine(this.chars.line, maxColumnWidths);
    result += this.renderHeader(rows, maxColumnWidths);
    result += this.renderRows(rows, maxColumnWidths);
    return result;
  }

  private renderHeader(rows: Rows, maxColumnWidths: number[]): string {
    rows.current = rows.header as Row;
    let result = this.renderChunk(rows, maxColumnWidths);
    result += this.renderLine(this.chars.betweenHeaderAndRows, maxColumnWidths);
    return result;
  }

  private renderRows(rows: Rows, maxColumnWidths: number[]): string {
    let result = '';
    while (rows.current) {
      result += this.renderChunk(rows, maxColumnWidths);
      result += this.renderLine(this.chars.line, maxColumnWidths);
    }
    return result;
  }

  private renderChunk(rows: Rows, maxColumnWidths: number[]): string {
    const current = rows.current as Row;
    let result = this.renderRow(current.data, maxColumnWidths);

    rows.current = current.next;
    while (rows.current && rows.current.isChunk) {
      result += this.renderRow(rows.current.data, maxColumnWidths);
      rows.current = rows.current.next;
    }

    return result;
  }

  private renderRow(row: TableRow, maxColumnWidths: number[]): string {
    const fmt = this.chars.row;
    const middle = row
      .map((v, i) => this.pad(v, maxColumnWidths[i]))
      .join(fmt.sep);
    const tmp = `${fmt.begin}${middle}${fmt.end}`.trimEnd();
    return `${tmp}${this.newline}`;
  }

  private renderLine(line: TableLine, maxColumnWidths: number[]): string {
    const middle = maxColumnWidths
      .map((v) => line.middle.repeat(v))
      .join(line.sep);
    const tmp = `${line.begin}${middle}${line.end}`;
    return tmp ? `${tmp}${this.newline}` : '';
  }

  private pad(word: string, width: number): string {
    const left = ' '.repeat(this.padding);
    const right = ' '.repeat(width - this.padding - word.length);
    return `${left}${word}${right}`;
  }
}
