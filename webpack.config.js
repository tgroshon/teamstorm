var webpack = require('webpack');

module.exports = {
	cache: true,
	context: __dirname + '/client',
	entry: {
		client: [
			'6to5/polyfill',
			'6to5/runtime',
			'./index.js'
		]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/i,
				exclude: /node_modules/,
				loader: '6to5'
			}
		],
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/public/js',
		publicPath: '/'
	},
  plugins: []
};

