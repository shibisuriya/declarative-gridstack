const path = require("path");

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    library: "@declarative-gridstack/react",
    libraryTarget: "umd",
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  entry: "./src/index.js",
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "@declarative-gridstack/react": "@declarative-gridstack/react",
  },
  module: {
    rules: [
      {
        test: /\.?js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Gridstack core needs to load css :)
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  devtool: false,
};
