const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/JS/app.js',

	plugins: [new MiniCssExtractPlugin()],

	module: {
		rules: [
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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
					name: '[name].[ext]',
				},
			},
		],
	},

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
