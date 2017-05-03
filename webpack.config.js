module.exports = {
  devtool: 'eval',
  entry: __dirname + '/app/main',
  output: {
    path: __dirname + '/app/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".jsx",".js"]
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
};