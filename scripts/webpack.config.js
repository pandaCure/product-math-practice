const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.tsx"
  },
  context: process.cwd(),
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name]-[hash:5].[ext]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src")
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".scss"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(process.cwd(), "public/index.html")
    })
  ],
  devServer: {
    contentBase: path.resolve(process.cwd(), "dist"),
    hot: true
  }
};
