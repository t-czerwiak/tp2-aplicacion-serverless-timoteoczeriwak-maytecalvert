import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["src/**/*.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-undef": "error",
    },
  },
  {
    files: ["src/**/*.astro"],
    rules: {
      "no-undef": "off",
    },
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**"],
  },
];