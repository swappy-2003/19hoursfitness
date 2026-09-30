const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TRAINERS = [
  {
    id: "ravikant-khadtare",
    number: "01",
    name: "Ravikant Khadtare",
    badge: "FOUNDER & OWNER",
    role: "Founder & Athletic Conditioning Specialist",
    discipline: "Cardio Engine & Agility",
    image: "ravikant-khadtare.png",
  },
  {
    id: "harpinder-singh",
    number: "02",
    name: "Harpinder Singh",
    badge: "COACH 02 · CADRE",
    role: "Strength & Resistance Coach",
    discipline: "Barbell Mastery & Muscle Gain",
    image: "harpinder-singh.png",
  },
  {
    id: "swapnil-gothal",
    number: "03",
    name: "Swapnil Gothal",
    badge: "COACH 03 · CADRE",
    role: "Strength & Performance Coach",
    discipline: "Powerlifting & Biomechanics",
    image: "swapnil-gothal.png",
  },
  {
    id: "nilesh-patekar",
    number: "04",
    name: "Nilesh Patekar",
    badge: "COACH 04 · CADRE",
    role: "CrossFit & Conditioning Specialist",
    discipline: "High-Intensity Functional Training",
    image: "nilesh-patekar.png",
  },
  {
    id: "swapnil-pendhare",
    number: "05",
    name: "Swapnil Pendhare",
    badge: "COACH 05 · CADRE",
    role: "Transformation & Hypertrophy Coach",
    discipline: "Body Recomposition & Nutrition",
    image: "swapnil-pendhare.png",
  },
  {
    id: "prasad-mestry",
    number: "06",
    name: "Prasad Mestry",
    badge: "COACH 06 · CADRE",
    role: "Elite Personal Trainer",
    discipline: "Strength Periodization & Mobility",
    image: "prasad-mestry.png",
  },
  {
    id: "gaurav-satam",
    number: "07",
    name: "Gaurav Satam",
    badge: "COACH 07 · CADRE",
    role: "Functional & Strength Specialist",
    discipline: "Athletic Performance & Core Stability",
    image: "gaurav-satam.png",
  },
];

const inputDir = path.join(__dirname, '../public/images/trainers');
const outputDir = path.join(__dirname, '../public/images/trainers/og');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generate() {
  console.log("Generating WhatsApp-compatible JPEG OG images...");

  for (const trainer of TRAINERS) {
    const srcPath = path.join(inputDir, trainer.image);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source not found: ${srcPath}`);
      continue;
    }

    // 1. Direct portrait JPG (resized, high quality, strictly < 200KB for WhatsApp)
    const directJpgPath = path.join(outputDir, `${trainer.id}.jpg`);
    await sharp(srcPath)
      .resize({ height: 1000, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(directJpgPath);

    const directStat = fs.statSync(directJpgPath);
    console.log(`[Photo JPG] ${trainer.id}.jpg -> ${(directStat.size / 1024).toFixed(1)} KB`);

    // 2. 1200x630 Branded Card JPG (Full width banner card for WhatsApp, Twitter, Facebook)
    const cardJpgPath = path.join(outputDir, `${trainer.id}-card.jpg`);

    // Resize trainer portrait to fit 630px height
    const trainerPortrait = await sharp(srcPath)
      .resize({ height: 630, fit: 'cover', position: 'top' })
      .toBuffer();

    const portraitMeta = await sharp(trainerPortrait).metadata();
    const portraitWidth = portraitMeta.width;
    const portraitLeft = 1200 - portraitWidth;

    // SVG Overlay with high-impact text, typography, and badges
    const isFounder = trainer.id === "ravikant-khadtare";
    const badgeBg = isFounder ? "#00E5FF" : "#1A1D24";
    const badgeText = isFounder ? "#08090B" : "#00E5FF";
    const badgeBorder = isFounder ? "#00E5FF" : "rgba(255,255,255,0.15)";

    // Escape ampersands for valid XML in SVG
    const safeName = trainer.name.toUpperCase().replace(/&/g, '&amp;');
    const safeRole = trainer.role.toUpperCase().replace(/&/g, '&amp;');
    const safeDiscipline = trainer.discipline.replace(/&/g, '&amp;');
    const safeBadge = trainer.badge.replace(/&/g, '&amp;');

    const svgOverlay = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#08090B" />
            <stop offset="50%" stop-color="#0E1015" />
            <stop offset="100%" stop-color="#08090B" />
          </linearGradient>
          <linearGradient id="fadeToDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#08090B" stop-opacity="1" />
            <stop offset="25%" stop-color="#08090B" stop-opacity="0.8" />
            <stop offset="60%" stop-color="#08090B" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#08090B" stop-opacity="0" />
          </linearGradient>
          <radialGradient id="cyanGlow" cx="20%" cy="40%" r="50%">
            <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#00E5FF" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Base Background -->
        <rect width="1200" height="630" fill="url(#bgGrad)" />
        <rect width="800" height="630" fill="url(#cyanGlow)" />

        <!-- Top Decorative Header -->
        <text x="60" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="20" fill="#F5F5F5" letter-spacing="4">19 HOURS FITNESS</text>
        <text x="320" y="70" font-family="monospace" font-size="12" fill="#00E5FF" letter-spacing="3">VIRAR WEST · ATHLETIC CADRE</text>
        <line x1="60" y1="95" x2="680" y2="95" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

        <!-- Coach Badge (Founder & Owner highlighted) -->
        <g transform="translate(60, 130)">
          <rect x="0" y="0" width="${isFounder ? 220 : 170}" height="32" rx="2" fill="${badgeBg}" stroke="${badgeBorder}" stroke-width="1" />
          <text x="${isFounder ? 110 : 85}" y="21" font-family="monospace" font-size="12" font-weight="bold" fill="${badgeText}" letter-spacing="2" text-anchor="middle">${safeBadge}</text>
        </g>

        <!-- Coach Name -->
        <text x="60" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="52" fill="#F5F5F5" letter-spacing="-1">
          ${safeName}
        </text>

        <!-- Role -->
        <text x="60" y="290" font-family="monospace" font-size="18" font-weight="bold" fill="#00E5FF" letter-spacing="2">
          ${safeRole}
        </text>

        <!-- Discipline -->
        <text x="60" y="325" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#969BA3" font-weight="300" letter-spacing="1">
          Specialization: ${safeDiscipline}
        </text>

        <!-- Card Footer Info -->
        <line x1="60" y1="520" x2="680" y2="520" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <text x="60" y="555" font-family="monospace" font-size="12" fill="#969BA3" letter-spacing="2">WHERE TRANSFORMATION BECOMES A LIFESTYLE</text>
        <text x="60" y="578" font-family="monospace" font-size="11" fill="#00E5FF" letter-spacing="2">19HOURSFITNESS.IN · BOOK 1-ON-1 PT</text>

        <!-- Edge Blend Shadow over photo -->
        <rect x="${portraitLeft - 100}" y="0" width="200" height="630" fill="url(#fadeToDark)" />
        <rect x="0" y="0" width="1200" height="630" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2" />
      </svg>
    `;

    // Composite background, photo, and overlay
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: '#08090B'
      }
    })
      .composite([
        {
          input: trainerPortrait,
          left: portraitLeft,
          top: 0
        },
        {
          input: Buffer.from(svgOverlay),
          left: 0,
          top: 0
        }
      ])
      .jpeg({ quality: 84, progressive: true, mozjpeg: true })
      .toFile(cardJpgPath);

    const cardStat = fs.statSync(cardJpgPath);
    console.log(`[Card JPG]  ${trainer.id}-card.jpg -> ${(cardStat.size / 1024).toFixed(1)} KB`);
  }

  console.log("All OG images generated successfully!");
}

generate().catch(err => {
  console.error("Error generating OG images:", err);
  process.exit(1);
});
