const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

const config  = {
    entry: {
        bundle: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devtool: 'source-map',
    devServer: {
        static: './src',
        compress: true,
        liveReload: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Development-1',
            template: './src/index.handlebars',
            inject: "body",
        }),
        // new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
            algorithm: "gzip",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                        // options: {
                        //     modules: true
                        //   }
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                    //     options: {
                    //         postcssOptions: {
                    //         plugins: [
                    //             [
                    //             "@fullhuman/postcss-purgecss",
                    //             {
                    //                 content: [
                    //                     './src/**/*.handlebars',
                    //                     './src/**/*.css',
                    //                 ]
                    //             },
                    //             ],
                    //         ],
                    //         },
                    //     },
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    },
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            },
        ],
    },
};


module.exports = () => {
    if (isProduction) {
      config.mode = 'production';
    } else {
      config.mode = 'development';
    }
    return config;
  };