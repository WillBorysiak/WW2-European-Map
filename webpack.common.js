const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/JS/app.js',

	plugins: [new MiniCssExtractPlugin()],

	module: {
		rules: [
			{
				test: /\.(jpg)$/i,
				use: [
					{
						loader: 'url-loader',
					},
				],
				type: 'asset/resource',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css|scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: '.' },
					},
					'css-loader',
					'sass-loader',
				],
			},
		],
	},

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
