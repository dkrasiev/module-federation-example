const path = require("path");
const webpack = require("webpack");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

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
    port: 3001,
    open: false,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        './main': './src/main.js'
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
