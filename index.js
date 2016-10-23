var express = require("express");
var app = express();
var path = require("path");
var mongo = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public'))); // location of scripts and styles
app.use(bodyParser.urlencoded({ extended: false })); // needed to parse POST requests

// home page
app.get("/", function(req, res){
    res.render("index");
});

// request for quotes is received
app.get("/get", function(req, res){

    mongo.connect("mongodb://readers:hello123@ds061246.mlab.com:61246/projects", function(err, db){
        if (err){
            throw err;
            res.end();
        } else {
            db.collection("quotes").find().toArray(function(err, docs){
                res.status(200).jsonp({data : docs});
                db.close();
            });
        }
    })
});

app.get("/add", function(req, res){
    res.render("addNewQuote");
});

app.post("/add", function(req, res){
    var data = {
        "text":req.body.quote,
        "author" : req.body.author
    };

    mongo.connect("mongodb://user:password@ds061246.mlab.com:61246/projects", function(err, db){
        if (err){
            throw err;
        } else {
            db.collection("quotes").insert(data, function(err, data){
                if (err){
                    throw err;
                }
                db.close();
            });
        }
    });
});

app.listen(port, function(){
    console.log("Listening on port " + port);
});
