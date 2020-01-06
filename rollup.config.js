import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-porter";

export default [
  {
    input: "./src/vendor.js",
    output: {
      dir: "./vendor",
      format: "es",
      chunkFileNames: "[name].js"
    },
    plugins: [
      css({ dest: "vendor/monaco.css" }),
      resolve(),
      commonjs(),
      terser()
    ]
  },
  {
    input: "node_modules/monaco-editor/esm/vs/editor/editor.worker.js",
    output: {
      file: "./vendor/worker/editor.js",
      format: "umd",
      name: "editor"
    },
    plugins: [resolve(), commonjs(), terser()]
  },
  {
    input: "node_modules/monaco-editor/esm/vs/language/html/html.worker.js",
    output: {
      file: "./vendor/worker/html.js",
      format: "umd",
      name: "html"
    },
    plugins: [resolve(), commonjs(), terser()]
  }
];
