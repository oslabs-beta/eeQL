const path = require("path");

module.exports = {
  // build details
  entry: "./public/electron.js",
  // resolve imports missing extensions
  resolve: { extensions: [".tsx", ".ts", ".js", ".jsx"] },
  // allow for use of node modules without altername name in minification
  node: {
    __dirname: false,
  },
  // electron build output location
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  // compiles electron when set
  target: "electron-main",
  devtool: "source-map",
  module: {
    // define type and loader method
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        // exclude transpilations of node modules
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
