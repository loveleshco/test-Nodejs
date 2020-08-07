const express = require('express');
const app = express();
const mongodb = require('mongo');
const mongoose = require('mongoose');
var bodyParser=require("body-parser");

const URI = "mongodb://localhost:27017/testdb1";
mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true }); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
});


var schema = new mongoose.Schema({
name:String,
img:String,
summary:String
});

var movie = mongoose.model('movie',schema);

var model = require('./movieJSN ');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
//console.log(model);

db.collection("movie").insertMany(model, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    
    //db.close();
  });






app.set('view engine','ejs');


app.get('/',(req,res)=>
{
res.send("Hello World");
});

app.get('/index',(req,res)=>{
    movie.find({}).then(result => {
        res.render('index',{results:result});
    })
    
});


app.listen(3000,(err)=>
{
    if(err)
    console.log("error");
    else
    console.log("connected");
})