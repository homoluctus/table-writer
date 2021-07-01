import { TableRow, TableRows } from './interfaces';

export class Row {
  data: TableRow;
  isChunk: boolean;
  next?: Row;

  constructor(data: TableRow, isChunk = false) {
    this.data = data;
    this.isChunk = isChunk;
  }
}

export class Rows {
  header?: Row;
  current?: Row;

  constructor(rows?: TableRows) {
    if (rows) {
      rows.forEach((r) => this.add(r));
    }
  }

  add(data: TableRow): void {
    if (this.header) {
      this.addNode(this.header, data);
    } else {
      this.header = new Row(data);
    }
  }

  private addNode(node: Row, data: TableRow): void {
    if (node.next) {
      this.addNode(node.next, data);
    } else {
      node.next = new Row(data);
    }
  }
}
