var mysql = require("mysql");
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.listen(port, function(){
    console.log("Listening on port " + port);
});

app.get("/", function(request, response){
    response.render("index");
});

app.get("/get", function(request, response){
    var connection = mysql.createConnection({
        connectionLimit: 100,
        host: "humadshah.com",
        user: "public_guests",
        password:"hello",
        database:"my_quotes"
    });
    
    connection.connect(function(error){
        if(error){
            console.log("Couldn't connect :(  " + error);
        } else {
            console.log("Connected successfully~!");
        }    
    });
    
    connection.query("SELECT * FROM Quotes", function(error, rows, fields){
       if (error) {
           console.log("Something went wrong... " + error);
       } else {
          response.jsonp({"quotes": rows});
       }
    });
    
    connection.end();
});

