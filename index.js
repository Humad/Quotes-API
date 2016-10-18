var mysql = require("mysql");
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");

// open a connection to the database
var connection = mysql.createConnection({
    connectionLimit: 100,
    host: "my-test-database.c3j6vph7cyv2.us-west-2.rds.amazonaws.com",
    user: "public",
    password:"helloworld",
    database:"quotes"
});

// connect to the database
connection.connect(function(error){
    if(error){
        console.log("Couldn't connect :(  " + error);
    } else {
        console.log("Connected successfully~!");
    }    
});


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
    connection.query("SELECT * FROM Quotes", function(error, rows, fields){
       if (error) {
           console.log("Something went wrong... " + error);
           res.end();
           connection.end();
       } else {
          res.jsonp({"quotes": rows});
          connection.end();
       }
    });
});

