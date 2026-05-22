/**
 * Derive a landscape splash from a portrait source.
 * Source: src/assets/images/splash_screen_portrait.jpg
 * Output: src/assets/images/splash_screen_landscape.png
 */

const fs = require('fs');
const { Jimp } = require('jimp');

const portraitImageSourcePath = 'src/assets/images/splash_screen_portrait.jpg';

(async function generateLandscapeImage() {
  try {
    if (!fs.existsSync(portraitImageSourcePath)) {
      throw new Error(`Source image ${portraitImageSourcePath} was not found.`);
    }

    console.log('\x1b[1m', 'Generating landscape splash image...', '\x1b[0m');

    const outputFilename = 'src/assets/images/splash_screen_landscape.png';
    const portraitImage = await Jimp.read(portraitImageSourcePath);

    const portraitImageHeight = portraitImage.bitmap.height;
    const portraitImageWidth = portraitImage.bitmap.width;

    const yOffsetArgument = Math.floor(Number(process.argv[2]));
    const defaultCenteredYOffset = Math.floor(
      portraitImageHeight / 2 - 805 / 2,
    );
    const yOffset = isNaN(yOffsetArgument)
      ? defaultCenteredYOffset
      : yOffsetArgument;
    const xOffset = 0;
    const cropToHeight = 805;

    const cropped = portraitImage.crop({
      x: xOffset,
      y: yOffset,
      w: portraitImageWidth,
      h: cropToHeight,
    });

    await cropped.write(outputFilename);

    console.log('\x1b[32m', 'Landscape splash created.', '\x1b[0m');
  } catch (error) {
    console.log(
      'ERROR: \x1b[31m',
      'Failed to create landscape splash.',
      '\x1b[0m',
    );
    throw error;
  }
})();
