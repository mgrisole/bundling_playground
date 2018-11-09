import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default [{
    input: './src/main.js',
    output: {
        file: 'dist/bundle.js',
        name: 'Hello',
        format: 'umd'
    },
    plugins: [
        serve({ contentBase: ['dist', 'docs'] }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}]