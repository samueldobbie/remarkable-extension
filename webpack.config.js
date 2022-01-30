const { resolve } = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    background: "./src/background/Background.ts",
    popup: "./src/popup/Popup.tsx",
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ],
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: "ts-loader",
    }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "src/popup/templates/popup.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: "public",
        to: ".",
      }],
    }),
    new CleanWebpackPlugin(),
  ]
}
