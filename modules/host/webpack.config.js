// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const { TEST_REMOTE_URL: REMOTE_REMOTE_URL = "http://localhost:3001", EXAMPLE_REMOTE_URL = 'http://localhost:3002' } = process.env;

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    new webpack.container.ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote: `remote@${REMOTE_REMOTE_URL}/remoteEntry.js`,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
