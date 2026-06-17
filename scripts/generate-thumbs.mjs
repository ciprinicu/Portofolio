import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PORTFOLIO_DIR = path.join(process.cwd(), 'PORTOFOLIO IMAGES ESAD');

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      if (entry.name.includes('-thumb')) continue;

      const ext = path.extname(entry.name);
      const base = path.basename(entry.name, ext);
      const thumbPath = path.join(dir, `${base}-thumb${ext}`);

      if (!fs.existsSync(thumbPath)) {
        console.log(`Generating thumbnail for: ${entry.name}`);
        try {
          await sharp(fullPath)
            .resize({ width: 50 })
            .jpeg({ quality: 10, progressive: true })
            .toFile(thumbPath);
        } catch (err) {
          console.error(`Failed to process ${entry.name}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting thumbnail generation...');
  await processDirectory(PORTFOLIO_DIR);
  console.log('Done!');
}

run();
