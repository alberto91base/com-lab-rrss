const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    globalObject: 'this'
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "comLabRRSS.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      }
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'PropTypes',
      root: 'PropTypes',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'prop-types': path.resolve(
        __dirname, 
        './node_modules/prop-types'
      ),
      'styled-components': path.resolve(
        __dirname,
        './node_modules/styled-components'
      ),
    },
  },
}