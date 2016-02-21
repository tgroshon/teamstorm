module.exports = {
  cache: true,
  context: __dirname + '/client',
  entry: {
    client: [
      'babel/polyfill',
      './app/index.js'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader?experimental&optional=runtime'
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public/js',
    publicPath: '/'
  },
  plugins: []
}
