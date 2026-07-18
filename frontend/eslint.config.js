import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // The codebase destructures fields off an object purely to exclude them
      // from a `...rest` spread (e.g. `const { id, ...attrs } = bed`). Without
      // this, every one of those omitted fields trips no-unused-vars.
      'no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
])
