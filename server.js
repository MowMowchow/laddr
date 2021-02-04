var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

// Mongo Connections
//var { MongoClient } = require("mongodb");


// production for build
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
} 



//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
  });
  

// Body parser prereqs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const { response } = require('express');


// main
app.get('/getitem', function(req, res){
    Item.find({}, function(err, items){
        if (err) {
            res.status(500).send({error: "could not fetch items"});   
        } else {
            res.send(items);
        }
    });
});

app.post('/postitem', function(req, res){
    var item = new Item();
    item.title = req.body.title;
    item.price = req.body.price;
    item.servings = req.body.servings;
    item.location = req.body.location;
    item.ready_time = req.body.ready_time;
    item.ingredients = req.body.ingredients;
    item.description = req.body.description;
    item.imgUrl = req.body.imgUrl;
    Item.find({
        title: item.title, 
        price: item.price, 
        location: item.location
        }, function(err, items){
            if (err){
                res.status(500).send({error: "Could not fetch items"});
            } else {
                if (!items.length){
                    called = true;
                    item.save(function(err, savedItem){
                        if (err){
                            res.status(500).send({error: "Could not upload item"});
                        } else {
                            res.send(savedItem);
                        }
                    });
                } else{
                     console.log("skipping item");
                }
            }
        });     
});


app.post('/ifcart', function(req, res){
    Cart.find({geoip:req.body.geoip}, function(err, carts){
        console.log(req.body.geoip);
        if (err) {
            res.status(500).send({error: "could not fetch items"});   
        } else {
            res.send(carts);
        }
    });
});


app.post('/newcart', function(req, res){
    var cart = new Cart();
    cart.geoip = req.body.geoip;
    cart.title = req.body.title;
    cart.items = [];
    
    Cart.find({
       geoip: cart.geoip
        }, function(err, carts){
            if (err){
                res.status(500).send({error: "Could not fetch carts"});
            } else {
                if (!carts.length){
                    called = true;
                    cart.save(function(err, savedCart){
                        if (err){
                            res.status(500).send({error: "Could not upload cart"});
                        } else {
                            res.send(savedCart);
                        }
                    });
                } else{
                     console.log("skipping cart");
                }
            }
        });     
});


app.put('/cartadditem', function(req, res){ // to add
    Item.findOne({_id: req.body.itemId}, function(err, item){
        if (err) {
            res.status(500).send({error: 'Could not add item to cart'});
        } else {
            Cart.update({_id: req.body.cartId}, {$addToSet: {items: item._id}}, function(err, cart){
                if (err) {
                    res.status(500).send({error: 'Could not add item to cart'});
                } else {
                    res.send('added item to cart');                    
                }
            });
        }
    });
});


app.put('/getcart', function(req, res) { //to populate
	Cart.find({geoip: req.body.geoip}).populate({ path: 'items', model: 'Item' }).exec(function(err, carts) {
		if (err) {
			res.status(500).send({ error: 'Could not fetch carts'});
		} else {
            console.log('populated carts');
			res.status(200).send(carts);
		}
	});
});


app.put('/getcart', function(req, res) { //to view
	Cart.find({geoip: req.body.geoip}, function(err, carts) {
		if (err) {
			res.status(500).send({error: 'Could not fetch carts'});
		} else {
            console.log('got carts');
			res.status(200).send(carts);
		}
	});
});


app.del('/cartremove', function(req, res) {
	Cart.deleteOne({ _id: req.body.cartId }, function(err, output) {
		if (err) {
			res.status(500).status({ error: 'Could not delete item' });
		} else {
			res.status(200).send('deleted item');
		}
	});
});


app.put('/cartremoveitem', function(req, res) {
	Item.findOne({ _id: req.body.itemId }, function(err, item) {
		if (err) {
			res.status(500).send({ error: 'Could not remove items from cart' });
		} else {
			Cart.update({_id: req.body.cartId}, {$pull: { items: item._id }}, function(err, cart) {
				if (err) {
					res.status(500).send({error: 'Could not remove items from cart' });
				} else {
					res.send(cart);
				}
			});
		}
	});
});



app.listen(PORT, console.log('server hosted at {PORT}'));