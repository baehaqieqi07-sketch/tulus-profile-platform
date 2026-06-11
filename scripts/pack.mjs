import { existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const out = 'tulus-premium-platform.zip';
if (existsSync(out)) rmSync(out);
execFileSync('zip', ['-r', out, '.', '-x', 'node_modules/*', 'dist/*', '.git/*', '*.zip', '.env'], { stdio: 'inherit' });
console.log(`Packed ${out}`);
