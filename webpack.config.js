module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/app.ts",
  // output: {
  //   filename: "bundle.js"
  // },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};