const path = require('path')
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

const projectRoot = __dirname
const sharedRoot = path.resolve(projectRoot, '../../shared')
const sharedDist = path.resolve(sharedRoot, 'dist')

const defaultConfig = getDefaultConfig(projectRoot)
const { assetExts, sourceExts } = defaultConfig.resolver

const config = {
  watchFolders: [sharedRoot],
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: {
      '@': `${projectRoot}/src`,
      '@shared': `${projectRoot}/src/shared`,
      '@redux': `${projectRoot}/src/redux`,
      '@screens': `${projectRoot}/src/screens`,
      '@network': `${projectRoot}/src/networkRequests`,
      '@router': `${projectRoot}/src/router`,
      '@flex/shared': sharedDist,
    },
  },
}

module.exports = mergeConfig(defaultConfig, config)
