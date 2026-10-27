import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const catalog = JSON.parse(await fs.readFile('content/portfolio/catalog.json', 'utf8'));
await fs.mkdir('public/project-previews', { recursive: true });
const manifest = {};
for (const item of catalog.items) {
  const source = await fs.readFile('content/portfolio/' + item.file);
  const variants = await Promise.all([480, 960, 1440].map(async width => ({
    width, bytes: await sharp(source).resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 }).toBuffer(),
  })));
  const version = createHash('sha256').update(Buffer.concat(variants.map(v => v.bytes))).digest('hex').slice(0, 12);
  const sources = {};
  for (const { width, bytes } of variants) {
    const file = item.project.slug + '.' + version + '-' + width + '.webp';
    await fs.writeFile('public/project-previews/' + file, bytes);
    sources[width] = '/project-previews/' + file;
  }
  const blur = await sharp(source).resize({ width: 20 }).webp({ quality: 30 }).toBuffer();
  manifest[item.cover.id] = { sources, blur: 'data:image/webp;base64,' + blur.toString('base64') };
}
await fs.writeFile('src/lib/public-cover-assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Prepared six public covers: versioned static files, responsive sizes and blur placeholders.');
