const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

let htmlPageNames = ['another', 'doi', 'unsuball'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    title: name,
    template: `./src/${name}.handlebars`, // relative path to the HTML files
    filename: `${name}/${name}.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
    inject: "body",
    minify: false,
  })
});

// no need for the extra load
multipleHtmlPlugins = !isProduction ? [] : multipleHtmlPlugins;

const config  = {
    entry: {
        index: './src/scripts/index.js',
        // doi: './src/scripts/doi.js',
        // another: './src/scripts/another.js',
        unsuball: './src/scripts/unsuball.js',
    },
    output: {
        filename: '[name]/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devtool: 'source-map',
    devServer: {
        // static: './src',
        static: path.join(__dirname, "src"),
        // directory: path.join(__dirname, "public"),
        // publicPath: '/',
        // contentBase: './public',
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
            title: 'HalloAnwalt Main',
            template: "./src/index.handlebars",
            filename: isProduction ? "index/index.html" : "index.html",
            inject: "body",
            minify: false,
        }),
        // new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
            algorithm: "gzip",
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ].concat(multipleHtmlPlugins),
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
                        // options: {
                        //     // `postcssOptions` is needed for postcss 8.x;
                        //     // if you use postcss 7.x skip the key
                        //     postcssOptions: {
                        //       // postcss plugins, can be exported to postcss.config.js
                        //       plugins: function () {
                        //         return [
                        //           require('autoprefixer')
                        //         ];
                        //       }
                        //     }
                        //   },
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
                loader: "handlebars-loader",
                options: {
                    partialDirs: [path.join(__dirname, "src", "partials")],
                },
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