const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = mode => {
  const env = require("dotenv")
    .config(mode === 'production' && { path:'./prod.env' }).parsed;
  console.log('ENV variables', env);

  return {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "./dist"),
      publicPath: "/",
      filename: "bundle.js",
    },
    devServer: {
      // app PORT.
      port: 8081,
      contentBase: "./",
      publicPath: "./dist/",
      historyApiFallback: true,
      // https: true,
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
        title: 'WorldwidePhotography',
        templateContent: '<div id="root"></div>',
        favicon: 'assets/images/logo.png',
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
  }
};
