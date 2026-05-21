import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const root = path.resolve('.');
const entry = path.join(root, 'js/main.js');

async function walk(file, seen = new Set()) {
  if (seen.has(file)) return;
  seen.add(file);
  const code = fs.readFileSync(file, 'utf8');
  const re = /from\s+['"](\.\/[^'"]+)['"]/g;
  let m;
  while ((m = re.exec(code))) {
    let target = path.resolve(path.dirname(file), m[1]);
    if (!target.endsWith('.js')) target += '.js';
    if (!fs.existsSync(target) && fs.existsSync(path.join(target, 'index.js'))) {
      target = path.join(target, 'index.js');
    }
    if (!fs.existsSync(target)) throw new Error(`Missing: ${target} (from ${file})`);
    await walk(target, seen);
  }
}

await walk(entry);
console.log('module graph ok');
