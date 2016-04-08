var Webpack = require("webpack");

var config = {
  devtool: 'source-map',
  resolve: {
    // Allows requiring files with an absolute path from the "jsx" directory
    root: [__dirname],
    extensions: ["", ".js"]
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /(node_modules)/, loader: 'babel', query: { presets: ['es2015'] } },
    ]
  },
  output: {
    filename: "smoother.js",
    sourceMapFilename: "smoother.js.map"
  }
};

// Initialize the plugins array first...
config.plugins = [];

// Performs textual replacement (like macros) in the JS source.
// This allows JS code to resolve to `if (false) debugThisThing()`
// which in turn allows uglify to strip out the dead code
// completely in production builds.
config.plugins.push(new Webpack.DefinePlugin({
  __DEV__: process.env.BUILD_DEV,
  __PROD__: process.env.BUILD_PROD
}));

if (process.env.BUILD_PROD === 'true') {
  config.plugins.push(new Webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }));
  config.plugins.push(new Webpack.optimize.UglifyJsPlugin({ mangle: true }));
}

module.exports = config;
