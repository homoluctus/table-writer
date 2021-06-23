import * as fs from 'fs';
import * as path from 'path';

export function repeatStr(num: number, v: string = 'A'): string {
  return v.repeat(num);
}

export function loadFixture(filename: string): string {
  const baseDir = path.join(__dirname, 'fixtures');
  const filepath = path.join(baseDir, filename);
  return fs.readFileSync(filepath, { encoding: 'utf8' });
}
