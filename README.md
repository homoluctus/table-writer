# Table Writer

Generate ASCII table

## Features

- Support multiple lines
  - Output words after the line break on the next row
  - Line breaks when the number of words is greater than terminal width
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

```typescript
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
