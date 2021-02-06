const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const fullCommandPath = process.env.npm_package_scripts_dev;

const env = require("dotenv").config(fullCommandPath.indexOf('development') === -1 && { path: './prod.env' }).parsed;
const bundleName = 'bundle.js';

// TODO
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    publicPath: "/",
    filename: bundleName,
  },
  devServer: {
    port: 8081,
    contentBase: "./",
    publicPath: "/dist/",
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      reducers: path.resolve(__dirname, "./src/redux"),
      screens: path.resolve(__dirname, "./src/screens"),
      navigation: path.resolve(__dirname, "./src/navigation"),
      components: path.resolve(__dirname, "./src/components"),
      services: path.resolve(__dirname, "./src/services"),
      utils: path.resolve(__dirname, "./src/utils"),
      styles: path.resolve(__dirname, "./src/styles"),
      types: path.resolve(__dirname, "./src/types"),
      mocks: path.resolve(__dirname, "./src/mocks"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      NODE_ENV: JSON.stringify(env.BACKEND_VERSION),
      BACKEND_URL: JSON.stringify(env.BACKEND_URL),
      BACKEND_PORT: JSON.stringify(env.BACKEND_PORT),
      BACKEND_FILE_SERVER_PORT: JSON.stringify(env.BACKEND_FILE_SERVER_PORT),
    }),
    new HtmlWebpackPlugin({
      templateContent:
        `
        <!DOCTYPE html>
        <html>
            <head>
              <title>WorldwidePhotography.com</title>
              <link rel="icon" href="assets/images/logo.png" />
              <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
              <div id="root"></div>
              <script src="./${bundleName}"></script>
            </body>
        </html>
        `,
      }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|ttf)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 20000,
                },
            },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
    ],
  },
};