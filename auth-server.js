
var path = require('path');
var qs = require('querystring');

var async = require('async');
// var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
// var jwt = require('jwt-simple');
// var moment = require('moment');
// var mongoose = require('mongoose');
var request = require('request');

// var config = require('./auth-config');

var app = express();

app.set('port', process.env.PORT || 5000);
//app.set('host', process.env.NODE_IP || 'localhost');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}
app.use(express.static(path.join(__dirname, '/dist')));


/*
 |--------------------------------------------------------------------------
 | Login with GitHub
 |--------------------------------------------------------------------------
 */
app.post('/auth/github', function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user?client_id=3c423f2faef7742fd1b0&client_secret=514aa1dd19370dae006ea144fc770bb41bd8e995';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: '514aa1dd19370dae006ea144fc770bb41bd8e995',
    redirect_uri: req.body.redirectUri
  };


  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = { 'User-Agent': 'demo' };
    // console.log(accessToken);

  //  res.send({ token: accessToken });

    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {
      // console.log(profile.name);
      res.send({ data: profile });

    });
  });
});



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */

app.listen(app.get('port'), app.get('host'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
