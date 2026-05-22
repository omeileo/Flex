/**
 * Derive a portrait splash from a landscape source.
 * Source: src/assets/images/splash_screen_landscape.png
 * Output: src/assets/images/splash_screen_portrait.jpg
 */

const fs = require('fs')
const { Jimp } = require('jimp')

const landscapeImageSourcePath = 'src/assets/images/splash_screen_landscape.png'

;(async function generatePortraitImage() {
  try {
    if (!fs.existsSync(landscapeImageSourcePath)) {
      throw new Error(`Source image ${landscapeImageSourcePath} was not found.`)
    }

    console.log('\033[1m', 'Generating portrait splash image...', '\x1b[0m')

    const outputFilename = 'src/assets/images/splash_screen_portrait.jpg'
    const landscapeImage = await Jimp.read(landscapeImageSourcePath)

    const landscapeImageHeight = landscapeImage.bitmap.height
    const landscapeImageWidth = landscapeImage.bitmap.width

    const xOffsetArgument = Math.floor(Number(process.argv[2]))
    const defaultCenteredXOffset = Math.floor(landscapeImageWidth / 2 - 805 / 2)
    const xOffset = isNaN(xOffsetArgument) ? defaultCenteredXOffset : xOffsetArgument
    const yOffset = 0
    const cropToWidth = 805

    const cropped = landscapeImage.crop({ x: xOffset, y: yOffset, w: cropToWidth, h: landscapeImageHeight })

    const scaledWidth = Math.floor(805 * 1.5)
    const scaledHeight = Math.floor(landscapeImageHeight * 1.5)
    const scaled = cropped.resize({ w: scaledWidth, h: scaledHeight })

    await scaled.write(outputFilename)

    console.log('\x1b[32m', 'Portrait splash created.', '\x1b[0m')
  } catch (error) {
    console.log('ERROR: \x1b[31m', 'Failed to create portrait splash.', '\x1b[0m')
    throw error
  }
})()
