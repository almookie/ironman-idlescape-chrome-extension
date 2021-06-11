const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },    
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    entry: {
        injector: './src/static/injector.js',
        index: './src/main.jsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: './src/static/' }],
        }),
    ],
}