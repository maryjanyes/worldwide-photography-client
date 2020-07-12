const webpack = require('webpack');
const path = require('path');

const env = require('dotenv').config();

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      port: 3008,
      contentBase: './',
      publicPath: '/dist/',
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        reducers: path.resolve(__dirname, './src/redux'),
        screens: path.resolve(__dirname, './src/screens'),
        navigation: path.resolve(__dirname, './src/navigation'),
        components: path.resolve(__dirname, './src/components'),
        services: path.resolve(__dirname, './src/services'),
        utils: path.resolve(__dirname, './src/utils'),
        styles: path.resolve(__dirname, './src/styles'),
        types: path.resolve(__dirname, './src/types'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BACKEND_URL': JSON.stringify(env.BACKEND_URL),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
};
