const fs = require('fs')
const path = require('path')
const { Jimp } = require('jimp')

const imagesDir = 'src/assets/images'
const imageSourcePath = path.join(imagesDir, 'splash_screen_portrait.jpg')

;(async function execute() {
  if (!fs.existsSync(imageSourcePath)) {
    throw new Error(`Source image ${imageSourcePath} was not found.`)
  }

  generateSplashForIos()
  await generateSplashForAndroid()
})()

function generateSplashForIos() {
  console.log('\033[1m', 'Generating splash image for iOS devices...', '\x1b[0m')

  const iosDestinationPath = `ios/FlexMobile/Images.xcassets/splash_screen.imageset/splash_screen_portrait.jpg`

  fs.copyFile(imageSourcePath, iosDestinationPath, error => {
    if (error) {
      console.log('ERROR: \x1b[31m', 'Failed to generate splash image for iOS devices.', '\x1b[0m', error.message)
    } else {
      console.log('\x1b[32m', 'Splash image generated for iOS devices.', '\x1b[0m')
    }
  })
}

async function generateSplashForAndroid() {
  console.log('\033[1m', 'Generating splash images for Android devices...', '\x1b[0m')

  const androidDestinationMain = 'android/app/src/main/res/'

  const androidDestinationSubFolders = {
    normal: 'drawable',
    ldpi: 'drawable-ldpi',
    hdpi: 'drawable-hdpi',
    xhdpi: 'drawable-xhdpi',
    xxhdpi: 'drawable-xxhdpi',
    xxxhdpi: 'drawable-xxxhdpi',
  }

  const androidResolutions = [
    { resolution: 'normal', width: 1242, height: 2208 },
    { resolution: 'ldpi', width: 200, height: 320 },
    { resolution: 'hdpi', width: 480, height: 800 },
    { resolution: 'xhdpi', width: 720, height: 1280 },
    { resolution: 'xxhdpi', width: 960, height: 1600 },
    { resolution: 'xxxhdpi', width: 1280, height: 1920 },
  ]

  for (const item of androidResolutions) {
    const outputPath = androidDestinationMain + `${androidDestinationSubFolders[item.resolution]}/`
    const outputFilename = 'launch_screen.jpg'

    try {
      const image = await Jimp.read(imageSourcePath)
      const scaledPortraitImage = image.resize({ w: item.width, h: item.height })
      await scaledPortraitImage.write(outputPath + outputFilename, { quality: 90 })

      console.log('\x1b[32m', `Launch screen created for resolution: ${item.resolution}.`, '\x1b[0m')
    } catch (error) {
      console.log('ERROR: \x1b[31m', `Failed to create launch screen for resolution: ${item.resolution}.`, '\x1b[0m')
      throw error
    }
  }
}
