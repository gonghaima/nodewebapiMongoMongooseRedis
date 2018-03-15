var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var dogs = require('./routes/dog_routes.js')(app);

var server = dogs.listen(3001, function () {
    console.log('Server running at http://127.0.0.1:3001/'); 
});