import resolve from 'rollup-plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {terser} from "rollup-plugin-terser";
import * as meta from "./package.json";

const config = {
  input: "src/index.js",
  output: {
    file: `dist/chrt.js`,
    name: "chrt",
    format: "cjs",
    indent: false,
    extend: true,
    exports: 'named',
    banner: `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author}`,
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' })
  ]
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: `dist/chrt.min.js`
    },
    plugins: [
      ...config.plugins,
      terser({
        output: {
          preamble: config.output.banner
        }
      })
    ]
  }
];
