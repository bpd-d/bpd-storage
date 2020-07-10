const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: false,
        minimize: false,
        minimizer: [new TerserPlugin({
            sourceMap: true,
        })]
    }
});