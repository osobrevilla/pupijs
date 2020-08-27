const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const { mode } = argv;
  const config = {
    entry: path.join(__dirname, "src", "demo", "index.ts"),
    output: {
      path: path.resolve("dist"),
      filename: "[name].min.js",
      umdNamedDefine: true,
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.(mp3)$/i,
          use: {
            loader: "file-loader",
            options: {
              outputPath: "sounds",
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".mp3"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/demo", "index.tpl.html"),
        inject: "body",
      }),
    ],
  };

  if (mode === "development") {
    config.devServer = {
      contentBase: path.join("/dist/"),
      hot: true,
      port: 9090,
      open: true,
    };
  }
  return config;
};
