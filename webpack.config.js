const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Lesta Games',
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
        {
            test: /\.html$/,
            use: 'html-loader',
        },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        type: 'asset/resource'
        },

    ]
  },
  devServer: {
    static: './dist',
    port: 3002
  }
};