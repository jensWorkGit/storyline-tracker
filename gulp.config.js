module.exports = function () {
  var client = './';
  var clientApp = client + 'app/';
  var root = './';

  var config = {
    /**
     * File paths
     */
    alljs: ['./**/*.js', './*.js'],
    client: client,
    typescript: ['./**/*.ts', './*.ts'],
    html: client + '**/*.html',
    index: client + 'index.html',
    // app js, with no specs
    js: [clientApp + '**/*.js'],
    root: root,
    source: 'src/',

    /**
     * browser sync
     */
    browserReloadDelay: 1000,

    /**
     * Node settings
     */
    nodeServer: './server.js',
    defaultPort: '8000'
  };

  return config;
};