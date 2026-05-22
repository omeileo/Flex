#!/bin/bash

# This script fixes the conflict between Prettier and ESLint configurations

# Ensure we're in the project root directory
cd "$(dirname "$0")/.."

# Check if .prettierrc exists, if so, remove it
if [ -f ".prettierrc" ]; then
  echo "Removing duplicate .prettierrc file..."
  rm .prettierrc
fi

# Update package.json to include eslint-config-prettier
echo "Updating dependencies..."
npm install --save-dev eslint-config-prettier

# Create a consistent .prettierrc.js file
echo "Creating consistent Prettier configuration..."
cat > .prettierrc.js << 'EOF'
module.exports = {
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
EOF

# Remove the prettier.config.mjs file if it exists
if [ -f "prettier.config.mjs" ]; then
  echo "Removing prettier.config.mjs file..."
  rm prettier.config.mjs
fi

# Update ESLint configuration
echo "Updating ESLint configuration..."
cat > .eslintrc.json << 'EOF'
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
EOF

# Remove eslint.config.mjs if it exists
if [ -f "eslint.config.mjs" ]; then
  echo "Removing eslint.config.mjs file..."
  rm eslint.config.mjs
fi

echo "Configuration fix complete. Please restart your editor to apply changes."
echo "You may need to run 'npm run lint:fix' to fix existing files." 