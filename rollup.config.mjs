import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  // Background Script Bundle
  {
    input: "src/scripts/background/index.ts",
    output: {
      file: "dist/scripts/background.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },

  // Content Script Bundle
  {
    input: "src/scripts/content/index.ts",
    output: {
      file: "dist/scripts/content.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
  // Popup Bundle
  {
    input: "src/scripts/popup/index.ts",
    output: {
      file: "dist/scripts/popup.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
];
