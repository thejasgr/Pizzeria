/*jslint node*/
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var mongodb = require('mongodb');
var jsonParser = bodyParser.json();
var cors = require('cors');


var dbName = 'Pizzeria_database';
var db = null;
var mongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

app.use(cors({
    origin: 'localhost:4200'
}));

function dbOperation(res, flagValue) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Unable to connect:' + err);
        } else {
            console.log('Connected');
            db = client.db(dbName);
            if (flagValue == 'getPizzaDetails') {
                getPizzaDetails(res);
            } else if (flagValue == 'getIngredientsDetails') {
                getIngredientsDetails(res);
            }

        }
    });
}

function getPizzaDetails(res) {
    if (db != null) {
        db.collection('pizza').find({}).toArray
            (
            function (err, result) {
                if (err) {
                    console.log('error' + err);
                }
                else {
                    console.log('data' + JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    console.log('Successful get pizza request');

                }
            }
            );
    }
}

function getIngredientsDetails(res) {
    console.log('in function');
    if (db !== null) {
        db.collection('ingredients').find({}).toArray
            (
            function (err, result) {
                if (err) {
                    console.log('error' + err);
                }
                else {
                    console.log('data' + JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    console.log('Successful get ingredients request');
                }
            }
            );
    }
}

app.get('/getpizza', jsonParser, function (req, res) {
    dbOperation(res, 'getPizzaDetails');
});

app.get('/getingredients', jsonParser, function (req, res) {
    dbOperation(res, 'getIngredientsDetails');
});

app.listen(3000, () => console.log('Server listening on port 3000'));