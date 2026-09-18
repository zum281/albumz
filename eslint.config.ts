import eslintReact from "@eslint-react/eslint-plugin";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import tanstackRouter from "@tanstack/eslint-plugin-router";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { ignores: ["dist/**", "src-tauri/target/**"] },
  ...tanstackRouter.configs["flat/recommended"],
  ...tanstackQuery.configs["flat/recommended-strict"],
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
    plugins: { js, prettier },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.es2021 } },
    rules: {
      "no-lonely-if": "error",
      "no-useless-return": "error",
      "no-useless-rename": "error",
      "default-case-last": "error",
      eqeqeq: "error",
      "no-else-return": "error",
      "no-template-curly-in-string": "error",
      "no-self-compare": "error",
      "no-unneeded-ternary": ["error", { defaultAssignment: false }],
      "no-var": "error",
      "prefer-const": "error",
      "no-nested-ternary": "error",
      "linebreak-style": ["error", "unix"],

      "prettier/prettier": ["error", {}, { usePrettierrc: true }],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "(^|/)node_modules/",
              message:
                "Unexpected import from 'node_modules/'. Import the package by name instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "eslint.config.ts",
            "prettier.config.ts",
            "commitlint.config.ts",
          ],
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/restrict-template-expressions": "off",
    },
  },
  {
    files: ["**/*.tsx"],
    extends: [
      eslintReact.configs["strict-type-checked"],
      reactRefresh.configs.vite,
    ],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "@eslint-react/exhaustive-deps": "error",
      "@eslint-react/no-array-index-key": "error",
      "@eslint-react/no-children-count": "error",
      "@eslint-react/no-children-for-each": "error",
      "@eslint-react/no-children-map": "error",
      "@eslint-react/no-children-only": "error",
      "@eslint-react/no-children-to-array": "error",
      "@eslint-react/no-clone-element": "error",
      "@eslint-react/no-context-provider": "error",
      "@eslint-react/no-forward-ref": "error",
      "@eslint-react/no-set-state-in-component-did-mount": "error",
      "@eslint-react/no-set-state-in-component-did-update": "error",
      "@eslint-react/no-set-state-in-component-will-update": "error",
      "@eslint-react/no-unnecessary-use-prefix": "error",
      "@eslint-react/no-unsafe-component-will-mount": "error",
      "@eslint-react/no-unsafe-component-will-receive-props": "error",
      "@eslint-react/no-unsafe-component-will-update": "error",
      "@eslint-react/no-unused-class-component-members": "error",
      "@eslint-react/no-use-context": "error",
      "@eslint-react/purity": "error",
      "@eslint-react/set-state-in-effect": "error",
      "@eslint-react/use-state": "error",
      "@eslint-react/jsx-no-comment-textnodes": "error",
      "@eslint-react/jsx-no-leaked-dollar": "error",
      "@eslint-react/jsx-no-leaked-semicolon": "error",
      "@eslint-react/dom-no-dangerously-set-innerhtml": "error",
      "@eslint-react/dom-no-script-url": "error",
      "@eslint-react/dom-no-unsafe-iframe-sandbox": "error",
      "@eslint-react/web-api-no-leaked-event-listener": "error",
      "@eslint-react/web-api-no-leaked-fetch": "error",
      "@eslint-react/web-api-no-leaked-intersection-observer": "error",
      "@eslint-react/web-api-no-leaked-interval": "error",
      "@eslint-react/web-api-no-leaked-resize-observer": "error",
      "@eslint-react/web-api-no-leaked-timeout": "error",
      "@eslint-react/naming-convention-context-name": "error",
      "@eslint-react/naming-convention-id-name": "error",
      "@eslint-react/naming-convention-ref-name": "error",
      "@eslint-react/no-unstable-context-value": "error",
      "@eslint-react/no-unstable-default-props": "error",
      "@eslint-react/jsx-no-useless-fragment": "error",
      "@eslint-react/dom-no-missing-button-type": "error",
      "@eslint-react/dom-no-missing-iframe-sandbox": "error",
      "@eslint-react/dom-no-unsafe-target-blank": "error",
      "@eslint-react/no-unused-props": "error",

      "@eslint-react/error-boundaries": "error",
      "@eslint-react/no-access-state-in-setstate": "error",
      "@eslint-react/no-component-will-mount": "error",
      "@eslint-react/no-create-ref": "error",
      "@eslint-react/no-direct-mutation-state": "error",
      "@eslint-react/no-missing-key": "error",
      "@eslint-react/no-nested-component-definitions": "error",
      "@eslint-react/no-nested-lazy-component-declarations": "error",
      "@eslint-react/rules-of-hooks": "error",
      "@eslint-react/set-state-in-render": "error",
      "@eslint-react/static-components": "error",
      "@eslint-react/unsupported-syntax": "error",
      "@eslint-react/use-memo": "error",
      "@eslint-react/jsx-no-children-prop": "off",
      "@eslint-react/jsx-no-children-prop-with-children": "error",
      "@eslint-react/jsx-no-key-after-spread": "error",
      "@eslint-react/jsx-no-namespace": "error",
      "@eslint-react/rsc-function-definition": "off",
      "@eslint-react/dom-no-dangerously-set-innerhtml-with-children": "error",
      "@eslint-react/dom-no-find-dom-node": "error",
      "@eslint-react/dom-no-flush-sync": "error",
      "@eslint-react/dom-no-hydrate": "error",
      "@eslint-react/dom-no-render": "error",
      "@eslint-react/dom-no-render-return-value": "error",
      "@eslint-react/dom-no-use-form-state": "error",
      "@eslint-react/dom-no-void-elements-with-children": "error",
      "@eslint-react/no-class-component": "off",
      "@eslint-react/no-misused-capture-owner-stack": "error",
      "@eslint-react/no-leaked-conditional-rendering": "error",

      "react-hooks/hooks": "error",
      "react-hooks/capitalized-calls": "error",
      "react-hooks/void-use-memo": "error",
      "react-hooks/immutability": "error",
      "react-hooks/globals": "error",
      "react-hooks/refs": "error",
      "react-hooks/no-deriving-state-in-effects": "error",
      "react-hooks/invariant": "error",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/memo-dependencies": "off",
      "react-hooks/incompatible-library": "off",
      "react-hooks/memoized-effect-dependencies": "off",
      "react-hooks/exhaustive-effect-dependencies": "off",
    },
  },
]);
