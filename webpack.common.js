const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/JS/app.js',

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'images/[hash][ext][query]',
	},

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
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /.json$/,
				type: 'asset/source',
			},
		],
	},
};
