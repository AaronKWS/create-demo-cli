const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./config.js");

module.exports = {
  mode: "development",
  entry: config.entry,
  output: {
    path: path.resolve(__dirname, "../", "build"),
    filename: "index.bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      utils: path.resolve(__dirname, "../utils"),
      src: path.resolve(__dirname, "../src"),
      build: path.resolve(__dirname, "../build"),
      static: path.resolve(__dirname, "../static"),
      public: path.resolve(__dirname, "../public"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 8080,
    hot: true,
  },
  module: {
    rules: config.rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
};
