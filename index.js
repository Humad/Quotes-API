var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");
var mongo = require('mongodb').MongoClient;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public'))); // location of scripts and styles


app.listen(port, function(){
    console.log("Listening on port " + port);
});

// home page
app.get("/", function(request, response){
    response.render("index");
});

// request for quotes is received
app.get("/get", function(req, res){

    mongo.connect("mongodb://root:awesome123@ds061246.mlab.com:61246/projects", function(err, db){
        if (err){
            console.log(err);
            res.end();
        } else {
            db.collection("quotes").find().toArray(function(err, docs){
                res.status(200).jsonp({data : docs});
                db.close();
            });
        }
    })

});

