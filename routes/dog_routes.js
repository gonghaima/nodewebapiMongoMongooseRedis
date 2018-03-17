var _ = require('lodash');
var Dog = require('../models/dogModel.js');

module.exports = function (app) {

    //Create
    app.post('/dog', function (req, res) {
        var newCat = new Dog(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({ info: 'error during dog create', error: err });
            };
        });
        res.json({ info: 'Dog created successfully!' });
    });

    //Read
    app.get('/dog', function (req, res) {
        Dog.find(function (err, cats) {
            if (err) {
                res.json({ info: 'error during find cats', error: err });
            };
            setTimeout(() => {
                res.json({ info: 'Dogs  found successfully!',data:cats });
            }, 10000);
        });
    });

    app.get('/dog/:id', function (req, res) {
        Dog.findById(req.params.id,function (err, dog) {
            if (err) {
                res.json({ info: 'error during find cats', error: err });
            };
            if (dog) {
                res.json({ info: 'Dog  found successfully!', data: dog });
            }
            else
                res.json({ info: 'Dog not found!' });
        });
    });

    //Update
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                res.json({ info: 'error during find cats', error: err });
            };
            if (dog) {
                _.merge(dog, req.body);
                dog.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during dog update', error: err });
                    };
                    res.json({ info: 'Dog updated successfully!'});
                });
            }
            else {
                res.json({ info: 'Dog not found!' });
            }
        });
    });

    //Delete
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove dog', error: err });
            }
            res.json({ info: 'Dog removed successfully!' });
        });
    });

    return app;

};