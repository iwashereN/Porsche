// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
 mode: 'development', // Set the mode to 'development'
  entry: {
    index: './src/index.js',
    profile: './src/profile.js',
    login : './src/login-signup.js',
    contact : './src/contact.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Ensures the output directory is cleaned before each build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/profile.html',
      chunks: ['profile'],
      filename: 'profile.html',
    }),
    new HtmlWebpackPlugin({
        inject: true,
        template: './public/login.html',
        chunks: ['login'],
        filename: 'login.html',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/contact.html',
        chunks: ['contact'],
        filename: 'contact.html',
      }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: {
      rewrites: [
        { from: /^\/profile$/, to: '/profile.html' },
      ],
    },
    hot: true,
    open: true, // Automatically open the browser
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
