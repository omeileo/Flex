module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
          '@shared': './src/shared',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@network': './src/networkRequests',
          '@router': './src/router',
          '@flex/shared': '../../shared/dist',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
