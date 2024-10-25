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
        process: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
      security: pluginSecurity,
      hooks: reactHooks,
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
      ...pluginReact.configs.flat.recommended.rules,
      "react/prop-types": "warn",
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-no-bind": [
        "warn",
        { ignoreRefs: true, allowArrowFunctions: true },
      ],
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
      "security/detect-object-injection": "warn",
      "security/detect-unsafe-regex": "warn",
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
