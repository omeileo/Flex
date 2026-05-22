# Fixing Prettier and ESLint Configuration

This guide will help you resolve the conflicts between Prettier and ESLint in your project.

## The Problem

When saving files, Prettier and ESLint rules are conflicting with each other, causing formatting issues and linting errors. This happens because:

1. There are duplicate configuration files (`.prettierrc` and `prettier.config.mjs`)
2. ESLint rules are not properly integrated with Prettier
3. Some formatting rules are defined in both ESLint and Prettier

## The Solution

### 1. Install Required Dependencies

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

### 2. Create a Single Prettier Configuration

Delete any existing Prettier configuration files (`.prettierrc`, `prettier.config.mjs`, etc.) and create a single `.prettierrc.js` file:

```js
module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react$', '^react-native$', '<THIRD_PARTY_MODULES>', '.*.container$', '.*.component$', '^[./]'],
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
```

### 3. Create a Proper ESLint Configuration

Delete any existing ESLint configuration files (`eslint.config.mjs`, `.eslintrc.js`, etc.) and create a single `.eslintrc.json` file:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "react", "prettier"],
  "rules": {
    "prettier/prettier": ["error", {}, { "usePrettierrc": true }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "no-console": "warn",
    "semi": ["error", "never"],
    "quotes": ["error", "single"]
  }
}
```

### 4. Update VS Code Settings

If you're using VS Code, update your workspace settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "prettier.requireConfig": true
}
```

### 5. Fix Existing Files

Run the following commands to fix formatting and linting issues in your existing files:

```bash
# Format all files with Prettier
npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"

# Fix linting issues
npx eslint --fix "**/*.{js,jsx,ts,tsx}"
```

### 6. Automation Script

For convenience, you can use the script provided in `scripts/fix-linting-config.sh` to automate the setup process.

## Common Issues

### Import Order Issues

If you're experiencing issues with import ordering, make sure the `@trivago/prettier-plugin-sort-imports` plugin is installed:

```bash
npm install --save-dev @trivago/prettier-plugin-sort-imports
```

### Template Literals and String Quotes

Be careful when using template literals and string quotes in your code. Prettier will format them according to its rules, which might conflict with ESLint rules if not properly configured.

### Line Length Issues

If you're experiencing issues with line length, adjust the `printWidth` setting in your Prettier configuration.

## Conclusion

By following this guide, you should have a properly configured Prettier and ESLint setup that works together harmoniously. If you encounter any issues, check the official documentation for [Prettier](https://prettier.io/docs/en/index.html) and [ESLint](https://eslint.org/docs/user-guide/getting-started).
