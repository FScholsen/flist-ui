import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

const input = "src/flist-button.ts";
const outputDir = "./dist/";
const extensions = [".ts"];

const config = {
  input: input,
  output: {
    dir: outputDir,
    format: "esm",
  },
  plugins: [
    resolve({ extensions }),
    babel({
      babelHelpers: "bundled",
      extensions: extensions,
      exclude: ["./node_modules/*"],
    }),
  ],
};

export default config;
