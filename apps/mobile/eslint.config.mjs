import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import globals from 'globals'

import spaceAfterClosingTag from './src/shared/eslintCustomRules/space-after-closing-tag.mjs'

const customRules = {
  'space-after-closing-tag': spaceAfterClosingTag
}

const compat = new FlatCompat()

export default [
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.node,
        ...js.configs.recommended.languageOptions?.globals,
        ...reactHooks.configs.recommended.languageOptions?.globals,
        __DEV__: 'readonly',
        NodeJS: 'readonly'
      }
    },
    ignores: ['build/**', 'android/**', 'ios/**', 'dist/**', 'coverage/**', 'node_modules/**']
  },

  js.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),

  {
    plugins: {
      react,
      '@typescript-eslint': tsPlugin,
      'react-native': reactNative,
      'custom-rules': { rules: customRules },
      prettier: eslintPluginPrettier
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-vars': 'off',
      'no-undef': 'warn',
      'no-console': 'warn',
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'linebreak-style': ['error', 'unix'],
      'newline-before-return': ['error'],
      'no-empty-function': 'warn',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-multi-spaces': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'object-curly-newline': ['error', { multiline: true, minProperties: 1 }],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],
      'custom-rules/space-after-closing-tag': 'off',
      'no-useless-escape': 'off',
      'react-native/no-inline-styles': 'error',
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'warn',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'moment', message: 'Use luxon instead.' },
            { name: 'date-fns', message: 'Use luxon instead.' },
            { name: 'redux-form', message: 'Use react-hook-form + yup.' },
            { name: 'react-native-router-flux', message: 'Use @react-navigation/native.' },
            { name: 'axios', message: 'Use the configureRequest pattern in src/networkRequests/apiClient/apiClient.functions.' },
            { name: 'enzyme', message: 'Use @testing-library/react-native.' }
          ]
        }
      ],
      'id-length': [
        'warn',
        {
          min: 3,
          exceptions: [
            'i', 'j', 'k', 'x', 'y', 'r', 'g', 'b', 'id', '_', 'db', 'fs', 'os',
            'in', 'tx', 'OR', 'sc', 'sm', 'c', 'a', 's', 'm', 'l', 'is', 'to',
            'OK', 'lt', 'LT', 'lte', 'LTE', 'gte', 'GTE', 'gt', 'GT',
            'lg', 'md', 'xs', 'xl', 'xxl', 'py', 'px', 'my', 'mx', 'gap',
            'mt', 'ml', 'mr', 'pt', 'pb', 'pl', 'pr', 'w', 'h',
            'ui', 'qs', '__', 'p', 'js', 'cn'
          ]
        }
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }]
    }
  },

  {
    files: ['src/shared/scripts/**/*.{ts,js}', 'src/networkRequests/apiClient/setEnv.scripts.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },

  {
    files: ['**/*.tests.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}', '**/__mocks__/**'],
    rules: {
      'react-native/no-inline-styles': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'id-length': 'off'
    }
  },

  prettier // Ensure Prettier is applied last
]
