import { TableRow } from './interfaces';
import { Rows } from './row';

export class Width {
  readonly maxWidth: number;
  private _maxColumnWidths: number[] = [];
  private minColumnWidth: number = 5;

  constructor(maxWidth: number = process.stdout.columns) {
    this.maxWidth = maxWidth;
  }

  get maxColumnWidths(): number[] {
    return this._maxColumnWidths;
  }

  compute(rows: Rows, padding: number = 0): void {
    this.minColumnWidth += padding * 2;

    let current = rows.header;
    while (current) {
      this.computeColumn(current.data, padding);
      current = current.next;
    }
  }

  computeColumn(row: TableRow, padding: number): void {
    if (!this._maxColumnWidths.length) {
      this._maxColumnWidths = row.map((r) => this.calcColumnWidth(r, padding));
    } else {
      row.forEach((r, i) => {
        const len = this.calcColumnWidth(r, padding);
        if (this._maxColumnWidths[i] < len) {
          this._maxColumnWidths[i] = len;
        }
      });
    }
  }

  private calcColumnWidth(v: string, padding: number): number {
    return v.length + padding * 2;
  }

  shrink(): boolean {
    const sum = this._maxColumnWidths.reduce((sum, ele) => sum + ele);
    const diff = sum - this.maxWidth;

    if (diff <= 0) {
      return false;
    }

    const len = this._maxColumnWidths.length;
    const shrink = Math.ceil(diff / len);
    this._maxColumnWidths = this._maxColumnWidths.map((v) => {
      const w = v - shrink;
      return w >= this.minColumnWidth ? w : this.minColumnWidth;
    });
    return true;
  }
}
