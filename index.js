var mysql = require("mysql");
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function(){
    console.log("Listening on port " + port);
});

app.get("/", function(request, response){
    response.render("index");
});

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

app.get("/get", function(req, res){
    
    connection.query("SELECT * FROM Quotes", function(error, rows, fields){
       if (error) {
           console.log("Something went wrong... " + error);
       } else {
          res.jsonp({"quotes": rows});
       }
    });
    
    connection.end();
});

app.get("/add", function(req, res){
    console.log(req.query);
    if (req.query != null) {
        console.log(req.query);
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

app.get("/secret", function(req, res){
    res.render("addNewQuote");
});

