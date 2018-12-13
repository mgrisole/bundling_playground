 import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';

let plugins = [
    typescript(),
    commonjs(),
];

/* 
    On debug mode some expressions are not available to watch when using babel
    That is why babel is only set when testing on IE or to compile final build
*/
if (process.env.dev) {
    plugins.push(
        serve({ contentBase: ['dist', 'docs'] })
    )
} else if (process.env.dev_ie) {
    plugins.push(
        serve({ contentBase: ['dist', 'docs'] }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
    )
} else {
    plugins.push(
        terser(),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
    )
}

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