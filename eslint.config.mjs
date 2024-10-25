import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginSecurity from "eslint-plugin-security";
import reactHooks from "eslint-plugin-react-hooks";

const indent = 2;

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        google: "readonly",
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      security: pluginSecurity,
      hooks: reactHooks,
    },
    rules: {
      // Boas práticas
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
      "no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      "no-magic-numbers": ["warn", { ignore: [0, 1], enforceConst: true }],
      curly: ["error", "all"],

      // Estilo
      indent: ["error", indent],
      quotes: ["error", "double"],
      semi: ["error", "always"],

      // Performance
      "no-useless-concat": "warn",
      "prefer-template": "warn",
      "no-loop-func": "warn",

      // Regras para React
      ...pluginReact.configs.flat.recommended.rules,
      "react/prop-types": "warn",
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-no-bind": [
        "warn",
        { ignoreRefs: true, allowArrowFunctions: true },
      ],
      "react/react-in-jsx-scope": "off", // React 17+,

      // Prettier
      "prettier/prettier": "error",

      // Segurança
      "security/detect-object-injection": "warn",
      "security/detect-unsafe-regex": "warn",

      // Avisos para uso de console.log
      "no-console": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
