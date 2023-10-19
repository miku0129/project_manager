const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");

const CleanPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env_mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

console.log("env_mode", env_mode)

const dist = `${__dirname}/dist`;
if (fs.existsSync(dist)) {
  fsExtra.removeSync(dist);
}
fs.mkdirSync(dist);

module.exports = {
  mode: env_mode,
  entry: "./src/app.ts",
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // injects bundle.js to our new index.html
      inject: true,
      // copys the content of the existing index.html to the new /build index.html
      template: path.resolve("./index.html"),
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
  ],
};