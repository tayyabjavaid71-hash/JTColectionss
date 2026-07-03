import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const frontendDist = path.join(root, 'frontend', 'dist');
const backendDist = path.join(root, 'backend', 'dist');
const outputRoot = path.join(root, 'hostinger-package');
const outputPublicHtml = path.join(outputRoot, 'public_html');
const outputBackend = path.join(outputRoot, 'backend');

function ensureExists(targetPath, name) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${name} not found: ${targetPath}. Run build first.`);
  }
}

function copyDirContents(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    fs.cpSync(path.join(src, item), path.join(dest, item), { recursive: true });
  }
}

ensureExists(frontendDist, 'Frontend dist');
ensureExists(backendDist, 'Backend dist');

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputPublicHtml, { recursive: true });
fs.mkdirSync(outputBackend, { recursive: true });

copyDirContents(frontendDist, outputPublicHtml);
copyDirContents(backendDist, path.join(outputBackend, 'dist'));

for (const filename of ['package.json', 'package-lock.json', '.npmrc', '.env.example']) {
  const sourceFile = path.join(root, 'backend', filename);
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, path.join(outputBackend, filename));
  }
}

const readme = [
  'HOSTINGER PACKAGE OUTPUT',
  '',
  'public_html/: upload this folder content to your domain public_html (frontend static files).',
  'backend/: deploy this folder as Node.js app (not in public_html).',
  '',
  'Backend app settings:',
  '- Node version: 22.x',
  '- Entry file: dist/index.js',
  '- Install command: npm ci',
  '- Build command: npm run build',
  '- Start command: npm start',
  '',
  'Set production environment variables in Hostinger panel before starting backend.'
].join('\n');

fs.writeFileSync(path.join(outputRoot, 'README.txt'), readme, 'utf8');

console.log('Hostinger package created at:', outputRoot);
console.log('Frontend upload folder:', outputPublicHtml);
console.log('Backend deploy folder:', outputBackend);
