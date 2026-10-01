const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TRAINERS = [
  {
    id: "ravikant-khadtare",
    image: "ravikant-khadtare.png",
  },
  {
    id: "harpinder-singh",
    image: "harpinder-singh.png",
  },
  {
    id: "swapnil-gothal",
    image: "swapnil-gothal.png",
  },
  {
    id: "nilesh-patekar",
    image: "nilesh-patekar.png",
  },
  {
    id: "swapnil-pendhare",
    image: "swapnil-pendhare.png",
  },
  {
    id: "prasad-mestry",
    image: "prasad-mestry.png",
  },
  {
    id: "gaurav-satam",
    image: "gaurav-satam.png",
  },
];

const inputDir = path.join(__dirname, '../public/images/trainers');
const outputDir = path.join(__dirname, '../public/images/trainers/og');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generate() {
  console.log("Generating WhatsApp & OpenGraph compatible trainer images...");

  for (const trainer of TRAINERS) {
    const srcPath = path.join(inputDir, trainer.image);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source not found: ${srcPath}`);
      continue;
    }

    // Direct trainer portrait JPG (resized, high quality, strictly < 100KB for WhatsApp and fast social previews)
    const directJpgPath = path.join(outputDir, `${trainer.id}.jpg`);
    await sharp(srcPath)
      .resize({ height: 1000, withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(directJpgPath);

    const directStat = fs.statSync(directJpgPath);
    console.log(`[Trainer Image JPG] ${trainer.id}.jpg -> ${(directStat.size / 1024).toFixed(1)} KB`);
  }

  console.log("All trainer OG images generated successfully!");
}

generate().catch(err => {
  console.error("Error generating OG images:", err);
  process.exit(1);
});
