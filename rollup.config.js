 import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';

let plugins = [
    typescript(),
    commonjs(),
    babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
];

plugins = [
    ...plugins,
    process.env.dev ? serve({ contentBase: ['dist', 'docs'] }) : terser()

]

export default [{
    input: './src/Typograph.ts',
    output: {
        file: 'dist/Typograph.js',
        name: 'Typograph',
        format: 'umd',
        sourcemap: true,
    },
    plugins,
}]