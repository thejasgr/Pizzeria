/*jslint node*/
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongodb = require('mongodb');
const jsonParser = bodyParser.json();


var dbName = 'Pizzeria_database';
var db = null;
var mongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function dbOperation(req, res, flagValue) {
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
            } else if (flagValue == 'addToCart') {
                addToCart(req, res);
            } else if (flagValue == 'getCart') {
                getCart(res);
            }

        }
    });
}
function getCart(res) {
    console.log('connected cart data');
    if (db != null) {
        db.collection('cart').find({}).toArray

            (

            function (err, result) {

                if (err) {

                    console.log('error');

                }

                else {

                    console.log('data' + JSON.stringify(result));

                    res.send(JSON.stringify(result));

                }

            }

            );

    }

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
                    res.send(JSON.stringify(result));
                    console.log('Successful get pizza request');

                }
            }
            );
    }
}

function getIngredientsDetails(res) {
    console.log('in function');
    if (db != null) {
        db.collection('ingredients').find({}).toArray
            (
            function (err, result) {
                if (err) {
                    console.log('error' + err);
                }
                else {
                    res.send(JSON.stringify(result));
                    console.log('Successful get ingredients request');
                }
            }
            );
    }
}
function addToCart(req, res) {
    if (db != null) {
        var pizzaId = parseInt(req.body.id);
        db.collection("pizza").find({ "id": pizzaId }).toArray(function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("working");
                console.log(typeof (req.body.id));
                db.collection('cart').find({ 'id': pizzaId, }).toArray(function (err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        if (result.length == 0) {
                            console.log(result[0])
                            db.collection('cart').insertOne({
                                "id": result[0].id,
                                "type": result[0].type,
                                "price": result[0].price,
                                "name": result[0].name,
                                "image": result[0].image,
                                "description": result[0].description,
                                "ingredients": result[0].ingredients,
                                "topping": result[0].topping.sort(1),
                                "quant": 1,
                                "addOns": req.body.topping.sort(1),
                                "addOnPrice": req.body.addOnPrice,
                                "total": req.body.total
                            });
                            console.log('inserted in cart');
                            var msg = { status: true, msg: "Registered" }
                            res.send(msg);

                        } else {
                            for (const iterator of result) {
                                if (iterator.id == pizzaId && iterator.addOns == req.body.topping.sort(1)) {
                                    db.collection('cart').update({ id: pizzaId }, { $set: { quant: result[0].quant + 1 } })
                                }
                            }

                        }
                    }
                })

                // db.collection('cart').insertOne({
                //     "id": result[0].id,
                //     "type": result[0].type,
                //     "price": result[0].price,
                //     "name": result[0].name,
                //     "image": result[0].image,
                //     "description": result[0].description,
                //     "ingredients": result[0].ingredients,
                //     "topping": result[0].topping.sort(1),
                //     "quant": 1,
                //     "addOns": req.body.topping,
                //     "addOnPrice": req.body.addOnPrice,
                //     "total": req.body.total
                // });
                // console.log('inserted in cart');
                // var msg = { status: true, msg: "Registered" }
                // res.send(msg);
            }
        })
    }
}
/* function addToCart(req, res) {
    if (db != null) {
        db.collection('cart').insertOne({ 'pizzaid': req.body.pizzaid, 'ingredients': req.body.ingredients });
        const result = { status: true, msg: 'post successful' };
        res.send(result);
    } else {
        const result = { status: flase, msg: 'post unsuccessful' };
        res.send(result);
    }
} */

app.get('/getpizza', function (req, res) {
    dbOperation(req, res, 'getPizzaDetails');
});

app.get('/getingredients', function (req, res) {
    dbOperation(req, res, 'getIngredientsDetails');
});

app.post('/addToCart', jsonParser, function (req, res) {
    dbOperation(req, res, 'addToCart');
})

app.get('/getCart', function (req, res) {
    dbOperation(req, res, 'getCart');
})

app.listen(3000, () => console.log('Server listening on port 3000'));