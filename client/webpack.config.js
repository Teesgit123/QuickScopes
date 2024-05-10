const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    entry: "./src/index.tsx",
    mode: "development",
    target: "web",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },

          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
            "sass-loader",
          ],
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      historyApiFallback: true,
      port: 3000,
      open: true,
    },
  },
];
