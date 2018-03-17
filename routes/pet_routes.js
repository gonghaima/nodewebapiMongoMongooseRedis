var r = require('request').defaults({
    json: true
});

var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

module.exports = function (app) {
    //Read
    app.get('/pets', function (req, res) {
        async.parallel(
            {
                cat: function (callback) {
                    r({ uri: 'http://localhost:3000/cat' }, function (err, response, body) {
                        console.log('cat api:', body);
                        
                        if (err) {
                            callback({ service: 'cat', error: err });
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
                    client.get('http://localhost:3001/dog', function (error, dog) {
                        if (error) { throw error; }
                        if (dog) {
                            console.log('dogs from redis:', dog);
                            callback(null, JSON.parse(dog));
                            // res.json(JSON.parse(dog));
                        } else {
                            r({ uri: 'http://localhost:3001/dog' }, function (err, response, body) {
                                if (err) {
                                    callback({ service: 'dog', error: err });
                                    return;
                                };
                                if (!err && response.statusCode == 200) {
                                    console.log('dogs from api',body.data);
                                    callback(null, body.data);
                                    client.set('http://localhost:3001/dog', JSON.stringify(body), function (error) {
                                        if(error){throw error;};
                                    });
                                } else {
                                    callback(response.statusCode);
                                }
                            });
                        }
                    });
                }
            },
            function (error, results) {
                console.log('callback from main:', results);
                res.json({
                    error: error,
                    results: results
                });
            }
        );
    });

    app.get('/ping', function (req, res) {
        res.json({ pong: Date.now() });
    });
    return app;
};
