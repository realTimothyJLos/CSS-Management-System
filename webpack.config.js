const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');

module.exports = {
    entry: {
        main: './src/main.js',
        ...getABTestingEntries(),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.[contenthash].css',
        }),
    ],
};

function getABTestingEntries() {
    const abTestingFiles = glob.sync('./src/ab-testing/*.js');
    const entries = {};

    for (const file of abTestingFiles) {
        const entryName = file.match(/\.\/src\/ab-testing\/(.*)\.js$/)[1];
        entries[entryName] = file;
    }

    return entries;
}
