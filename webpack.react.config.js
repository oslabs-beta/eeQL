const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const monacoEditor = path.resolve(__dirname, "./node_modules/monaco-editor");
const semanticUI = path.resolve(__dirname, "./node_modules/semantic-ui-react");

module.exports = {
  entry: "./src/index.js",
  // performance, allow for tsx editing after transpilation
  // create dev server conditions
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    // allow fallback to origin
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    // help serve assets to app
    publicPath: "/",
  },
  // switched target from node to electron renderer. Was receiving errors in monaco client
  target: "electron-renderer",
  // describe compilation environment
  // resolve missing extensions and allow import of node modules
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
    mainFields: ["main", "module", "browser"],
  },
  // allow use of code editor and html render plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
    }),
    new MonacoWebpackPlugin(),
  ],
  // define type and loader methods
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: "file-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: "file-loader",
      },
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        include: [monacoEditor, semanticUI],
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader", options: { happyPackMode: true } }],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    // altered to allow for access to public files
    publicPath: "./",
  },
};
