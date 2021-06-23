import { TableOptions, TableRow, TableRows } from './interfaces';
import { Renderer } from './renderer';
import { Rows } from './row';
import { Width } from './width';
import { wrap } from './wrap';

export class Table {
  private rows: Rows;
  private width: Width;
  private renderer: Renderer;

  constructor(rows?: TableRows, options: TableOptions = {}) {
    this.rows = new Rows(rows);
    this.renderer = new Renderer(options.style, options.format);
    this.width = new Width(options.width);
    this.width.compute(this.rows, this.renderer.padding);
  }

  add(row: TableRow): void {
    this.rows.add(row);
    this.width.computeColumn(row, this.renderer.padding);
  }

  write(): string {
    const shrinked = this.width.shrink();
    if (shrinked) {
      wrap(this.rows, this.width.maxColumnWidths, this.renderer.padding);
    }
    return this.renderer.render(this.rows, this.width.maxColumnWidths);
  }
}
