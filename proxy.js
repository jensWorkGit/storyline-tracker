#!/usr/bin/env node

var historyFallback = require('connect-history-api-fallback');
var log = require('connect-logger');
var yargs = require('yargs');
var sync = require('browser-sync').create();
var defaultOpenPath = '';

yargs.option('files', {
  describe: 'array of file paths to watch',
  type: 'array'
});

var argv = yargs.argv;
var openPath = getOpenPath();
var options =
  {
    openPath: openPath,
    files: argv.files ? argv.files : [
      openPath + '/**/*.html',
      openPath + '/**/*.css',
      openPath + '/**/*.js'
    ],
    baseDir: argv.baseDir || './',
    fallback: '/' + openPath + '/index.html'
  };

if (argv.verbose) {
  console.log('options', options);
}

function getOpenPath() {
  var src = argv.open || defaultOpenPath;
  if (!src) {
    return '.'
  }
  return src;
}

// ////////////////
// var httpProxy = require('http-proxy');
// var apiProxy = httpProxy.createProxyServer({
//     target: 'http://127.0.0.1:3002'
//   }
// ).listen(3003);

// app.get("/api/*", function(req, res){
//   apiProxy.web(req, res, { target: 'http://127.0.0.1:3002' });
// });

// app.get("/", function(req, res){
//   staticProxy.web(req, res, { target: 'http://127.0.0.1:3000' });
// });


var httpProxy = require('http-proxy-middleware');
var apiProxy = httpProxy('/api', {
  target: 'http://127.0.0.1:3002',
  changeOrigin: true   // for vhosted sites, changes host header to match to target's host
});

sync.init({
  port: argv.port || 3000,
  server: {
    baseDir: options.baseDir,
    middleware: [
      log(),
      apiProxy,
      historyFallback({ index: options.fallback })
    ]
  },
  files: options.files,
});
