const config = {
  entry: './example/src/index.js',
  output: {
    filename: 'index.js',
    path: './example/build'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}

module.exports = config
