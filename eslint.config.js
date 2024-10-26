import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginPrettier from "eslint-plugin-prettier";
import pluginSecurity from "eslint-plugin-security";
import reactRefresh from "eslint-plugin-react-refresh";

const indent = 2;

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        google: "readonly",
        process: "readonly",
        require: "readonly",
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks, // Ajuste no nome do plugin
      prettier: pluginPrettier,
      security: pluginSecurity,
      "react-refresh": reactRefresh,
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      "no-magic-numbers": ["warn", { ignore: [0, 1], enforceConst: true }],
      curly: ["error", "all"],
      indent: ["error", indent],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-useless-concat": "warn",
      "prefer-template": "warn",
      "no-loop-func": "warn",

      // Regras recomendadas do JavaScript
      ...pluginJs.configs.recommended.rules,

      // Regras recomendadas do React
      ...pluginReact.configs.flat.recommended.rules,
      "react/prop-types": "warn",
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-no-bind": [
        "warn",
        { ignoreRefs: true, allowArrowFunctions: true },
      ],
      "react/react-in-jsx-scope": "off",

      // Regras para react-hooks
      ...pluginReactHooks.configs.recommended.rules,

      // Regras de plugins adicionais
      "prettier/prettier": "error",
      "security/detect-object-injection": "warn",
      "security/detect-unsafe-regex": "warn",

      // Regras do react-refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
