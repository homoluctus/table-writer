# Table Writer

Generate ASCII table

## Features

- Automatic wrap
  - Line breaks if the number of words is greater than terminal width
- Automatic padding
- Choose predefined table styles
  - simple
  - grid

## Installtion

```bash
npm i table-writer
```

or

```bash
yarn add table-writer
```

## Usage

### Basic

```typescript
import { Table } from 'table-writer';

const table = new Table([
  ['header1', 'header2', 'header3'],
  ['row11', 'row12', 'row13'],
  ['row21', 'row22', 'row33']
]);
console.log(table.write());
```

```bash
---------------------------
 header1  header2  header3
===========================
 row11    row12    row13
---------------------------
 row21    row22    row33
---------------------------
```

### Change table style

```typescript
import { Table } from 'table-writer';

const table = new Table([
  ['header1', 'header2', 'header3'],
  ['row11', 'row12', 'row13'],
  ['row21', 'row22', 'row33']
], { style: 'grid' });
console.log(table.write());
```

## Table Styles

### Simple

```
--------------------------------------------------
 A          AAAAAAAAA          AAAAAAAAAA
==================================================
 AAAAAAAAA  AAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAA
--------------------------------------------------
 AAAAAAAAA  AAAAAAAAAAAAAAAAA  AAAAAAAAAAAAAAAAAA
 AAA
--------------------------------------------------
```

### Grid

```
+-----------+-------------------+--------------------+
| A         | AAAAAAAAA         | AAAAAAAAAA         |
+===========+===================+====================+
| AAAAAAAAA | AAAAAAAAAAAAAAAAA | AAAAAAAAAAAAAAAAAA |
+-----------+-------------------+--------------------+
| AAAAAAAAA | AAAAAAAAAAAAAAAAA | AAAAAAAAAAAAAAAAAA |
| AAA       |                   |                    |
+-----------+-------------------+--------------------+
```
