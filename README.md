# Table Writer

Generate ASCII table

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/homoluctus/table-writer/Test?label=test)
![GitHub](https://img.shields.io/github/license/homoluctus/table-writer)
![npm](https://img.shields.io/npm/v/table-writer)
![node-current](https://img.shields.io/node/v/table-writer)

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

## API

### class Table

#### constructor(rows [, options])

- rows
  - `[][]string (TableRows)`
  - text context of table
  - **rows[0][0]** is treated as table header
- options
  - `object (TableOptions)`
  - see [options](#options)

##### options

||Required|Default|Description|
|:--:|:--:|:--:|:--|
|style|No|simple|Predefined table style. See following [Table Styles](#table-styles)|
|format|No|N/A|Customize table style.|
|width|No|process.stdout.columns|Maximum terminal width.|

#### add(row): void

Add a row to existing table rows. Treat table header if no talbe rows.

- row
  - `[][]string (TableRow)`
  - a row of table

#### write(): string

Render table.

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
