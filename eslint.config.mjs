import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      local: (await import("./eslint-rules/no-ui-literals.js")).default,
    },
    rules: {
      "local/no-ui-literals": [
        "warn",
        {
          allowInFiles: ["/content/", "/lib/content/"],
          ignoreAttributes: [
            "className",
            "id",
            "data-*",
            "aria-*",
            "stroke",
            "fill",
            "viewBox",
            "role",
            "width",
            "height",
          ],
          ignorePatterns: [
            // Ignora placeholders cortos frecuentemente no copy
            "^#.+$", // hashtags
            "^[A-Z0-9_]{2,}$", // siglas/constantes
          ],
          minLetters: 2,
        },
      ],
    },
  },
];

export default eslintConfig;
