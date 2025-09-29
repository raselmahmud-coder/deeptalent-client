import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

export default [
  // Main bundle
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'build/index.js',
        format: 'cjs',
        sourcemap: false
      },
      {
        file: 'build/index.esm.js',
        format: 'esm',
        sourcemap: false
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: false
      }),
      postcss({
        extract: 'build/styles.css',
        minimize: production,
        plugins: [autoprefixer()]
      }),
      production && terser({
        mangle: {
          properties: {
            regex: /^_/ // Mangle private properties starting with _
          }
        }
      })
    ].filter(Boolean)
  },
  // Type definitions
  {
    input: 'build/index.d.ts',
    output: {
      file: 'build/index.d.ts',
      format: 'esm'
    },
    plugins: [dts()],
    external: ['react', 'react-dom']
  }
];