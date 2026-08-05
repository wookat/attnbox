import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/coverage/**", "**/node_modules/**", "apps/web/dist/**", "apps/site/.astro/**", "apps/site/dist/**", "packages/cli/web-dist/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-console": ["error", { allow: ["error", "warn"] }]
    }
  },
  {
    files: ["packages/cli/src/**", "packages/cli/scripts/**", "scripts/**"],
    languageOptions: { globals: globals.node },
    rules: { "no-console": "off" }
  },
  {
    files: ["apps/web/public/sw.js"],
    languageOptions: { globals: globals.serviceworker }
  }
);
