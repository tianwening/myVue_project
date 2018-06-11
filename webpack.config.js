const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    // 入口
    entry: {
        main: "./src/main.js",
        vendors: ["vue", "vue-router", "moment", "vue-preview", "axios"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name][chunkhash:6]-build.js"
    },
    devServer: {
        contentBase: "./src",
        inline: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"],
                    publicPath: "../"
                }),
            },
            {
                test: /\.(jpg|png|svg|ttf|woff|woff2|gif|jpeg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 4096,
                        name: "assets/[name].[ext]"
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /vue-preview.src.*?js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: "vue-loader"
                }]
            }
        ]
    },
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					name: "manifest"
				}
			}
		}
	},
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new extractTextPlugin("css/[name][contenthash:8].css")
    ],
    mode: "production"
}