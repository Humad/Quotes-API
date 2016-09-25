var mysql = require("mysql");
var http = require("http");



var connection = mysql.createConnection({
    connectionLimit: 100,
    host: "humadshah.com",
    user: "public_guests", // user with only the SELECT privilege 
    password:"hello",
    database:"my_quotes" // a database I've got up on my hosting site
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
      console.log(rows);
      return rows;
   }
});

connection.end();