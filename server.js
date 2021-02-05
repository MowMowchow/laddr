var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
var data = require('./data/filtered_income_data.json');


const PORT = process.env.PORT || 3001;

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
app.post('/get_data', function(req, res){
  res.send(data[req.body.field])  
});

app.listen(PORT, console.log('server hosted at {PORT}'));