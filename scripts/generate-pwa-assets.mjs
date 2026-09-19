import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

// Conserva el diseño original; solo ajusta tamaño, formato y márgenes.
const source = 'public/images/imagenes/MINI.png';
await mkdir('public/icons', { recursive: true });

async function square(filename, size, contentRatio) {
  const contentSize = Math.round(size * contentRatio);
  const content = await sharp(source)
    .resize(contentSize, contentSize, { fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 3, background: '#ffffff' } })
    .composite([{ input: content, gravity: 'centre' }]).png()
    .toFile(`public/icons/${filename}`);
}

await square('icon-192.png', 192, 0.86);
await square('icon-512.png', 512, 0.86);
// El cuadrado central queda dentro del círculo seguro de los íconos maskable.
await square('icon-maskable-512.png', 512, 0.56);
await square('apple-touch-icon.png', 180, 0.8);
await square('favicon-32.png', 32, 1);

const preview = await sharp(source).resize(550, 550).flatten({ background: '#ffffff' }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([{ input: preview, gravity: 'centre' }]).png()
  .toFile('public/social-preview.png');
