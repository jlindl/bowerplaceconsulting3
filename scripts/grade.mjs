// Grades stock photos into one consistent look: cool, high-contrast black and white.
// The cobalt duotone seen on hover is applied in CSS, so these stay neutral.
// Usage: node scripts/grade.mjs <rawDir>
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const raw = process.argv[2];
const keep = new Set(['hero', 'digital', 'programme', 'cloud', 'case-central', 'case-council', 'case-nhs', 'case-alb', 'about', 'townhall']);
for (const f of fs.readdirSync(raw).filter((f) => f.endsWith('.jpg'))) {
  const name = path.basename(f, '.jpg');
  if (!keep.has(name)) continue;
  await sharp(path.join(raw, f))
    .grayscale()
    .normalise({ lower: 2, upper: 98 })
    .linear(1.12, -10)
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(`public/images/${name}.webp`);
  console.log('graded', name);
}
