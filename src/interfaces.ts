export type TableRow = Array<string>;
export type TableRows = Array<TableRow>;

export type TableStyle = 'simple' | 'grid';

export interface TableOptions {
  style?: TableStyle;
  format?: TableFormat;
  width?: number;
}

export interface TableLine {
  begin: string;
  middle: string;
  sep: string;
  end: string;
}

export interface TableFormat {
  padding: number;
  chars: {
    betweenHeaderAndRows: TableLine;
    line: TableLine;
    row: { begin: string; sep: string; end: string };
  };
}
