// 打包的配置文件
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PUBLIC_DIR_PATH = path.join(__dirname, 'src');

// const config = {}
// module.exports = config;

module.exports = {
    entry: './src/js/root.js', // 打包的入口，可以有多个 entry []
    output: { // 打包结果的输出，可以有多个 filename []
        path: PUBLIC_DIR_PATH, // 不要写 /src
        filename: 'bundle.js', // index.html ==> <script src="./bundle.js"></script>
    },
    module: {
        rules: [ // 当前版本已经不支持 loaders
            {
                test: /\.js?$/, // 要解析的文件后缀名
                exclude: /node_modules/, // 要排除的文件
                loader: 'babel-loader', // 处理 es6 的加载器
                include: PUBLIC_DIR_PATH, // 要包含的文件
                // use: 'babel-loader' // 可以使用 use 或者 loader
            },
            {   test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extensions: [".js", ".css", "jsx"] // 自动补全识别后缀，默认只解析 .js
    },
    devServer: {
        inline: true, // 在启动命令中仍需要显示声明
        hot: true, // 在启动命令中仍需要显示声明
        port: 8080, // 指定端口
        contentBase: PUBLIC_DIR_PATH,
        historyApiFallback: true,
        open: false, // 部署后自动在浏览器打开
        proxy: {},
        overlay: {
            error: true,
        },
    },
    // devtool: 'source-map', //生成一个 SourceMap 文件，output 目录下会多一个 boundle.js.map 文件
    plugins: [ // 生成入口模板 html
        // new HtmlWebpackPlugin({
        //   title: "欢迎",
        //   chunks:["build"]
        // }),
        // new HtmlWebpackPlugin({
        //   title: "欢迎",
        //   filename: "class.html",
        //   chunks: ["build"]
        // })
    ]
};
