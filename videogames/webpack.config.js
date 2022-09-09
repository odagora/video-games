const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const views = ["index", "profile", "search", "article"];

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js",
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                    use: ["html-loader", "pug-html-loader"]
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        ...views.map((view) =>
            new HtmlWebpackPlugin({
                inject: 'body',
                template: `./src/views/${view}.pug`,
                filename: `${view}.html`,
            }),
        ),
        new MiniCssExtractPlugin({
            filename: "css/[name]-styles.css",
            chunkFilename: "[id].css",
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true
        },
        watchFiles: path.join(__dirname, "./**"),
        compress: true,
        historyApiFallback: true,
        port: 3006,
        open: true,
    },
}