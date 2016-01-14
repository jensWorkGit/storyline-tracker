'use strict';
var config = require('./gulp.config')();
var express = require('express');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');

var app = express();
var port = process.env.PORT || 8000;
var environment = process.env.NODE_ENV || 'DEV';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

var apiProxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:3002'
});

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

app.use('/api/*', function (req, res, next) {
  var toUrl = 'http://127.0.0.1:3002' + req.originalUrl;
  console.log(toUrl);
  apiProxy.web(req, res, { target: toUrl });
});
app.use(express.static(config.client));

// Any deep link calls should return index.html
app.use('/*', express.static(config.index));

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});