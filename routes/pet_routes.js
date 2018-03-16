var r = require('request').defaults({
  json: true
});

var async = require('async');

module.exports = function(app) {
  //Read
  app.get('/pets', function(req, res) {
    async.parallel(
      {
        cat: function (callback) {
            r({ uri: 'http://localhost:3000/cat' }, function (err, response, body) {
                if (err) {
                    callback({ service: 'cat', error: error });
                    return;
                };
                if (!err && response.statusCode == 200) {
                    callback(null, body.data);
                } else {
                    callback(response.statusCode);
                }
            });
        },
        dog: function (callback) {
            r({ uri: 'http://localhost:3001/dog' }, function (err, response, body) {
                if (err) {
                    callback({ service: 'dog', error: error });
                    return;
                };
                if (!err && response.statusCode == 200) {
                    callback(null, body.data);
                } else {
                    callback(response.statusCode);
                }
            });
        }
      },
      function(error, results) {
        res.json({
          error: error,
          results: results
        });
      }
    );
  });

  app.get('/ping', function(req, res) {
    res.json({ pong: Date.now() });
  });
  return app;
};
