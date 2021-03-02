import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import path from "path";

// The name of the package must match the directory name
const baseFileName = path.basename(__dirname);
const input = `./src/${baseFileName}.ts`;
const outputDir = "./dist/";
const extensions = [".js", ".ts"];

export default {
  input,
  // This is referenced in https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
  // When using with 'babelHelpers: "runtime"' (to allow async/await), it should be used as 'external' in Rollup config
  // but it results in fail to resolve module specifier
  // external: [/@babel\/runtime/],
  output: [
    {
      file: outputDir + baseFileName + ".js",
      format: "esm",
      sourcemap: true,
    },
    // Production build
    {
      file: outputDir + baseFileName + ".min.js",
      format: "esm",
      plugins: [
        terser({
          module: true,
          format: {
            comments: false,
          },
        }),
      ],
    },
    // {
    //   file: outputDir + baseFileName + ".iife.js",
    //   format: "iife",
    // },
  ],
  plugins: [
    resolve({ extensions }),
    // plugin-commonjs must be placed before plugin-babel
    commonjs({ include: /node_modules/ }),
    babel({
      babelHelpers: "runtime",
      extensions,
      include: [
        "src/**/*",
        "./node_modules/lit-element/**",
        "./node_modules/lit-html/**",
      ],
      exclude: ["./node_modules/**"],
    }),
  ],
};
