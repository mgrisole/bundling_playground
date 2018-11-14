import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';

export default [{
    input: './src/Typograph.ts',
    output: {
        file: 'dist/Typograph.js',
        name: 'Typograph',
        format: 'umd'
    },
    plugins: [
        typescript(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        terser(),
        serve({ contentBase: ['dist', 'docs'] }),
    ]
}]