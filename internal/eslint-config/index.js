import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import jsoncParser from 'jsonc-eslint-parser'
import eslintPluginJsonc from 'eslint-plugin-jsonc'
import markdown from '@eslint/markdown'
import vueParser from 'vue-eslint-parser'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
  markdown.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] }
      }
    },
    rules: {
      // js/ts
      camelcase: ['error', { properties: 'never' }],
      'no-console': ['warn', { allow: ['error'] }],
      'no-debugger': 'warn',
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
      'no-return-await': 'error',
      'no-var': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'prefer-const': [
        'warn',
        { destructuring: 'all', ignoreReadBeforeAssign: true }
      ],
      'prefer-arrow-callback': [
        'error',
        { allowNamedFunctions: false, allowUnboundThis: true }
      ],
      'object-shorthand': [
        'error',
        'always',
        { ignoreConstructors: false, avoidQuotes: true }
      ],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',

      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',

      // best-practice
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'no-alert': 'warn',
      'no-case-declarations': 'error',
      'no-multi-str': 'error',
      'no-with': 'error',
      'no-void': 'error',

      'sort-imports': [
        'warn',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false
        }
      ],

      // stylistic-issues
      'prefer-exponentiation-operator': 'error',

      // ts
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/ban-ts-comment': ['off', { 'ts-ignore': false }],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // vue
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/prefer-import-from-vue': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/singleline-html-element-content-newline': 'off',

      // import
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type'
          ],
          pathGroups: [
            {
              pattern: 'vue',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@vue/**',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@allin-design/**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always'
        }
      ],
      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/named': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'lodash', message: 'Use lodash-unified instead.' },
            { name: 'lodash-es', message: 'Use lodash-unified instead.' }
          ],
          patterns: [
            {
              group: ['lodash/*', 'lodash-es/*'],
              message: 'Use lodash-unified instead.'
            }
          ]
        }
      ],

      // prettier
      'prettier/prettier': 'error'
    }
  },

  {
    files: ['*.json', '*.json5', '*.jsonc'],
    languageOptions: {
      parser: jsoncParser
    }
  },

  {
    files: ['**/__tests__/**'],
    rules: {
      'no-console': 'off',
      'vue/one-component-per-file': 'off'
    }
  },

  {
    files: ['package.json'],
    languageOptions: {
      parser: jsoncParser
    },
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            'name',
            'version',
            'private',
            'packageManager',
            'description',
            'type',
            'keywords',
            'homepage',
            'bugs',
            'license',
            'author',
            'contributors',
            'funding',
            'files',
            'main',
            'module',
            'exports',
            'unpkg',
            'jsdelivr',
            'browser',
            'bin',
            'man',
            'directories',
            'repository',
            'publishConfig',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'optionalDependencies',
            'dependencies',
            'devDependencies',
            'engines',
            'config',
            'overrides',
            'pnpm',
            'husky',
            'lint-staged',
            'eslintConfig'
          ]
        },
        {
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
          order: { type: 'asc' }
        }
      ]
    }
  },

  {
    files: ['*.d.ts'],
    rules: {
      'import/no-duplicates': 'off'
    }
  },

  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off'
    }
  },

  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { disallowTypeAnnotations: false }
      ]
    }
  },

  {
    files: ['**/*.md/*.js', '**/*.md/*.ts'],
    rules: {
      'no-console': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },

  {
    ignores: [
      'node_modules/',
      'dist/',
      '.idea/',
      'pnpm-lock.yaml',
      'CHANGELOG*.md',
      'coverage',
      '!.*'
    ]
  }
)
