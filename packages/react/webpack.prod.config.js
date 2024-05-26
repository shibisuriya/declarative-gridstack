const path = require("path");

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    library: "@declarative-gridstack/react",
    libraryTarget: "umd",
  },
  entry: "./src/gridstack/index.js",
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "@declarative-gridstack/react": "@declarative-gridstack/react",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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
