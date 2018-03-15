var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pets');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var pets = require('./routes/pet_routes.js')(app);

var server = pets.listen(3002, function () {
    console.log('Server running at http://127.0.0.1:3002/'); 
});