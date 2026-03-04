import js from "@eslint/js";
import globals from "globals";

export default [
  
  {
    ignores: ["eslint.config.mjs"] 
  },
  
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node
      }
    },
    rules: {
      "indent": ["error", 4],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "never"],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "no-console": 0
    }
  }
];