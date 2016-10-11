var mysql = require("mysql");
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");

// open a connection to the database
var connection = mysql.createConnection({
    connectionLimit: 100,
    host: "humadshah.com",
    user: "public_guests",
    password:"hello",
    database:"my_quotes"
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
       } else {
          res.jsonp({"quotes": rows});
       }
    });
    res.end();
});

// request for quote to be added is received
app.get("/add", function(req, res){
    if (req.query != null) {
        connection.query("INSERT INTO Quotes(ID, Quote, Author) VALUES (0,?,?)",
                         [decodeURIComponent(req.query.quote.toString()), decodeURIComponent(req.query.author.toString())],
                         function(error, rows, fields){
           if (error) {
               console.log("Something went wrong... " + error);
           } else {
               console.log("Entry added!");
           }
        });
    }
    res.end();
});

// secret page that allows users to add quotes to the database
app.get("/secret", function(req, res){
    res.render("addNewQuote");
});

