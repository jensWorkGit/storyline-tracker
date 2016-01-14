var args = require('yargs').argv;
var browserSync = require('browser-sync');
var path = require('path');
var cp = require('child_process');
var config = require('./gulp.config')();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

var colors = $.util.colors;
var envenv = $.util.env;
var port = process.env.PORT || config.defaultPort;

gulp.task('serve', function () {
  serve();
});

gulp.task('tsc-w', function () {
  gulp.watch(config.typescript, ['tsc']);
});

gulp.task('tsc', function (done) {
  var tscjs = path.join(process.cwd(), 'node_modules/typescript/bin/tsc');
  var childProcess = cp.spawn('node', [tscjs], { cwd: process.cwd() });
  childProcess.stdout.on('data', function (data) {
    console.log(data.toString());
  });
  childProcess.stderr.on('data', function (data) {
    console.log(data.toString());
  });
  childProcess.on('close', function () {
    done();
  });
});

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function serve() {
  var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': 'dev'
    },
    watch: [config.nodeServer]
  };

  return $.nodemon(nodeOptions)
    .on('restart', ['tsc'], function (ev) {
      log('*** nodemon restarted');
      log('files changed:\n' + ev);
      setTimeout(function () {
        browserSync.notify('reloading now ...');
        browserSync.reload({stream: false});
      }, config.browserReloadDelay);
    })
    .on('start', function () {
      log('*** nodemon started');
      startBrowserSync();
    })
    .on('crash', function () {
      log('*** nodemon crashed: script crashed for some reason');
    })
    .on('exit', function () {
      log('*** nodemon exited cleanly');
    });
}

function startBrowserSync() {
  if (browserSync.active) { return; }

  log('Starting BrowserSync on port ' + port);

  gulp.watch(config.typescript, ['tsc'])
    .on('change', changeEvent);

  var options = {
    proxy: 'localhost:' + port,
    port: 3000,
    files: [config.client + '**/*.js', config.client + '**/*.css', config.client + '**/*.html'],
    ghostMode: { // these are the defaults t,f,t,t
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'storyline',
    notify: true,
    reloadDelay: config.browserReloadDelay
  };

  browserSync(options);
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

module.exports = gulp;