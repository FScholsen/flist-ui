import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const input = "src/flist-button.ts";
const outputDir = "./dist/";
const extensions = [".ts"];

const config = {
  input: input,
  output: {
    dir: outputDir,
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      extensions,
      include: ["src/**/*"],
      exclude: ["./node_modules/*"],
    }),
  ],
};

export default config;
