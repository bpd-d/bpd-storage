'use strict'
var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const TerserPlugin = require('terser-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const setPath = function (folderName) {
    return path.join(__dirname, folderName);
};
const isProd = function () {
    return (process.env.NODE_ENV === 'production') ? true : false;
};
module.exports = {
    mode: isProd ? 'production' : 'development',
    //devtool: 'source-map',
    optimization: {
        runtimeChunk: false,
        // minimize: true,
        // minimizer: [ new TerserPlugin({
        //     sourceMap: true,
        // })]
    },
    resolveLoader: {
        modules: [setPath('node_modules')]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: false
    },
    entry: {
        index: './src/index.ts',
        //styles: './src/styles.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 hmr: !isProd(),
            //             }
            //         },
            //         {
            //             loader: "css-loader", // translates CSS into CommonJS
            //             options: { url: false, sourceMap: true }
            //         },
            //         {
            //             loader: "sass-loader", // compiles Sass to CSS
            //             options: { sourceMap: true }
            //         }
            //     ]
            // }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: "bpd-storage",
        umdNamedDefine: true
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
};