export default {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^react-native$',
    '<THIRD_PARTY_MODULES>',
    '.*.container$',
    '.*.component$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: true,
  trailingComma: 'none',
  semi: false,
  tabWidth: 2,
  arrowParens: 'always',
  printWidth: 120,
  bracketSpacing: true,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'auto'
}
