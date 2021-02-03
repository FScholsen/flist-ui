import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";

// The name of the package must match the directory name
const input = `./src/${path.basename(__dirname)}.ts`;
const outputDir = "./dist/";
const extensions = [".js", ".ts"];

export default {
  input,
  output: {
    dir: outputDir,
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve({ extensions }),
    commonjs({ include: /node_modules/ }),
    babel({
      babelHelpers: "bundled",
      extensions,
      include: ["src/**/*"],
      exclude: ["./node_modules/*"],
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    }),
  ],
};
