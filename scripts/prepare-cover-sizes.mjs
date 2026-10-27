import fs from 'node:fs/promises';
import sharp from 'sharp';
const catalog = JSON.parse(await fs.readFile('content/portfolio/catalog.json', 'utf8'));
for (const item of catalog.items) {
  for (const width of [480, 960]) {
    await sharp('content/portfolio/' + item.file).resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 }).toFile('content/portfolio/' + item.file.replace('.webp', '-' + width + '.webp'));
  }
}
console.log('Prepared 480px and 960px WebP covers for six projects.');
