module.exports = {
  preset: 'react-native',
  setupFilesAfterEach: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@network/(.*)$': '<rootDir>/src/networkRequests/$1',
    '^@router/(.*)$': '<rootDir>/src/router/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-redux|@react-native-firebase|@react-native-async-storage|@react-native-community)',
  ],
  testRegex: '\\.tests\\.(ts|tsx)$',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.tests.{ts,tsx}',
    '!src/**/*.types.ts',
    '!src/**/*.dictionary.ts',
    '!src/scripts/**',
  ],
};
