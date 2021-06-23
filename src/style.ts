import { TableStyle, TableFormat } from './interfaces';

export const styles: Record<TableStyle, Readonly<TableFormat>> = {
  simple: {
    padding: 1,
    chars: {
      betweenHeaderAndRows: {
        begin: '',
        middle: '=',
        sep: '',
        end: ''
      },
      line: {
        begin: '',
        middle: '-',
        sep: '',
        end: ''
      },
      row: {
        begin: '',
        sep: '',
        end: ''
      }
    }
  },
  grid: {
    padding: 1,
    chars: {
      betweenHeaderAndRows: {
        begin: '+',
        middle: '=',
        sep: '+',
        end: '+'
      },
      line: {
        begin: '+',
        middle: '-',
        sep: '+',
        end: '+'
      },
      row: {
        begin: '|',
        sep: '|',
        end: '|'
      }
    }
  }
};
