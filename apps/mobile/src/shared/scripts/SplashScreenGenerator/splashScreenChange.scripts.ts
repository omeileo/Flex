const execSync = require('child_process').execSync;

const sourceOrientation = (process.argv[2] ?? 'portrait').toLowerCase();
const offset = process.argv[3] ?? '';

const script =
  sourceOrientation === 'landscape'
    ? `npm run splash-portrait-generate -- ${offset} && npm run splash-images-setup`
    : `npm run splash-landscape-generate -- ${offset} && npm run splash-images-setup`;

execSync(script, { stdio: 'inherit' });
