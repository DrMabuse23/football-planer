var path = require('path');


module.exports = {
  entry: [
    path.normalize('es6-shim/es6-shim.min'),
    'reflect-metadata',
    path.normalize('zone.js/dist/zone-microtask'),
    path.resolve('app/app')
  ],
  output: {
    path: path.resolve('www/build/js'),
    filename: 'app.bundle.js',
    pathinfo: true // show module paths in the bundle, handy for debugging
***REMOVED***,
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        query: {
          doTypeCheck: true,
          resolveGlobs: false,
          externals: ['typings/browser.d.ts']
      ***REMOVED***,
        include: path.resolve('app'),
        exclude: /node_modules/
    ***REMOVED***,
      {
        test: /\.js$/,
        include: path.resolve('node_modules/angular2'),
        loader: 'strip-sourcemap'
    ***REMOVED***
    ],
    noParse: [
      /es6-shim/,
      /reflect-metadata/,
      /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
    ]
***REMOVED***,
  resolve: {
    root: ['app'],
    alias: {
      'angular2': path.resolve('node_modules/angular2')
  ***REMOVED***,
    extensions: ["", ".js", ".ts"]
***REMOVED***
***REMOVED***;
