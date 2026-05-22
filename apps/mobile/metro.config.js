const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
const sharedRoot = path.resolve(monorepoRoot, 'shared');
const sharedDist = path.resolve(sharedRoot, 'dist');

const defaultConfig = getDefaultConfig(projectRoot);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  watchFolders: [monorepoRoot],
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
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
};

module.exports = mergeConfig(defaultConfig, config);
