const path = require("path");

module.exports = {
  React: [],
  Sass: [],
  Vue: [],
  TS: {
    entry: path.resolve(__dirname, "../src/index.ts"),
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  DEFULT: {
    entry: path.resolve(__dirname, "../src/index.js"),
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env"]],
            },
          },
        ],
      },
    ],
  },
};
