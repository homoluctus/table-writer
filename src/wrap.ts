import { Row, Rows } from './row';

export function wrap(
  rows: Rows,
  maxColWidths: number[],
  padding: number = 0
): void {
  rows.current = rows.header;
  while (rows.current) {
    rows.current.data.forEach((v, i) => {
      const strlen = v.length;
      const maxColWidth = maxColWidths[i] - padding * 2;
      if (strlen <= maxColWidth) {
        return;
      }

      let row = rows.current as Row;
      const cnt = Math.ceil(strlen / maxColWidth);
      for (let j = 0; j < cnt; j++) {
        const substr = v.substring(j * maxColWidth, (j + 1) * maxColWidth);

        if (j === 0) {
          row.data[i] = substr;
        } else if (row.next && row.next.isChunk) {
          row.next.data[i] = substr;
          row = row.next;
        } else {
          const old = row.next;
          const chunk = createChunk(maxColWidths.length, i, substr);
          row.next = new Row(chunk, true);
          row.next.next = old;
          row = row.next;
        }
      }
    });
    rows.current = rows.current.next;
  }
}

function createChunk(len: number, index: number, str: string): string[] {
  const arr = Array(len).fill('');
  arr[index] = str;
  return arr;
}
