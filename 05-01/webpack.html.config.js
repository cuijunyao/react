const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PUBLIC_DIR_PATH = path.join(__dirname, 'src');

// const config = {}
// module.exports = config;

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: PUBLIC_DIR_PATH,
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.css$/,
                loaders: ["style", "css", "less"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".css", "jsx"]
    },
    devServer: {
        inline: true,
        hot: true,
        port: 8080,
        contentBase: PUBLIC_DIR_PATH,
        historyApiFallback: true,
        open: true,
        proxy: {},
        overlay: {
            error: true,
        },
    },
    // devtool: 'source-map',
    plugins: [
        // new HtmlWebpackPlugin({
        //   title: "欢迎",
        //   chunks:["build"]
        // }),
        new HtmlWebpackPlugin({
            title: "欢迎",
            filename: "class.html",
            chunks: ["build"]
        })
    ]
};
