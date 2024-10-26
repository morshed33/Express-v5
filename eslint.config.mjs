import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] }, // Remove .jsx and .tsx extensions
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // "no-console": "warn",
      "no-debugger": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "warn",
      "no-var": "warn",
      "prefer-const": "warn",
      "prefer-arrow-callback": "warn",
      "prefer-template": "warn",
      "object-shorthand": "warn",
      "consistent-return": "warn",
      "no-process-exit": "warn",
      "callback-return": "warn",
      "handle-callback-err": "warn",
      "no-new-require": "warn",

      // Style & formatting
      "spaced-comment": "warn",
      "arrow-spacing": "warn",
      "keyword-spacing": "warn",
      "comma-spacing": "warn",
      "comma-style": "warn",
      "space-before-blocks": "warn",
      "space-infix-ops": "warn",
      "eol-last": "warn",
      "brace-style": "warn",
      "array-bracket-spacing": "warn",
      semi: "off",
      quotes: ["warn", "double"],
      indent: ["warn", 2],

      // TypeScript specific
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
];
