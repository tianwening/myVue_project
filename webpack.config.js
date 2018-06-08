const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	// 入口
	entry: {
		main: "./src/main.js"
	},
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "build.js"
	},
	devServer: {
		contentBase: "./src",
		inline: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader","css-loader"]
			},
			{
				test: /\.(jpg|png|svg|ttf|woff|woff2|gif|jpeg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							limit: 4096,
							name: "[name].[ext]"
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["env"],//关键字转义
							plugins: ["transform-runtime"]//函数转义
						}
					}
				]
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: "vue-loader"
					}
				]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: "./src/index.html"
		})
	],
	mode: "development"
}