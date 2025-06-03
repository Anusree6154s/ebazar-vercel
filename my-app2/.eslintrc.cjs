/* eslint-env node */
module.exports = {
  ignorePatterns: ["dist"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "react-hooks",
    "react-refresh",
    "unused-imports",
    "import",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "unused-imports/no-unused-imports": "warn",
    "import/named": "error",
    "import/default": "error",
    "import/no-unresolved": "error",
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the installed React version
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
