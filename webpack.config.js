const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const { mode } = argv;
  const config = {
    entry: path.join(__dirname, "src", "index"),
    output: {
      path: path.resolve("dist"),
      filename: "pupijs.js",
      chunkFilename: "pupijs.[chunkhash].js"
    },
    externals: {
      jquery: "jQuery",
      ocrad: "OCRAD"
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [path.resolve(__dirname, "src")],
          exclude: [path.resolve(__dirname, "node_modules")],
          loader: "babel-loader",
          query: {
            presets: [
              [
                "@babel/env",
                {
                  targets: {
                    browsers: "last 2 chrome versions"
                  }
                }
              ]
            ]
          }
        }
      ]
    },
    plugins: [
      new CopyPlugin([{ from: "./src/lib/ocrad.js", to: "./lib/ocrad.js" }]),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.tpl.html"),
        inject: "body"
      })
    ],
    resolve: {
      extensions: [".json", ".js", ".jsx"]
    },
    devtool: "source-map"
  };

  if (mode === "development") {
    config.devServer = {
      contentBase: path.join("/dist/"),
      hot: true,
      port: 9090,
      open: true
    };
  }
  return config;
};
