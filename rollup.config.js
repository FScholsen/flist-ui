import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const input = "./src/flist-button.ts";
const outputDir = "./dist/";
const extensions = [".js", ".ts"];
console.log("running global");

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
    }),
  ],
};