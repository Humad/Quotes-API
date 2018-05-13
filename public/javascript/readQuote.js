$(document).ready(function(){
    var quotes;
    // some colors taken from: https://codepen.io/FreeCodeCamp/pen/ONjoLe
    var colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6",
                  "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857",
                  "#BCCF02", "#5BB12F", "#73C5FF", "#9B539C", "#EB65A0", "#69D2E7",
                  "#A7DBDB", "#E0E4CC", "#F38630", "#FA6900"];

    var quote = $("#quote");
    var au = $("#author");
    var twitter = $("#tweet");

    // Sends a GET request to the server when the page loads,
    // and stores the results
    $.ajax({
       type: "GET",
       url: window.location.href + "get", // https://urlHere/get
       dataType: "json",
       success: function(d){
          quotes = d.data; // store response
          console.log("Success!");
          getNewQuote();
       },
       error: function(err){
          console.log("Ran into an error... " + err.toString());
       }
    });

    $("#new-quote").on("click", function(){
       getNewQuote();
    });

    // Updates the page colors, texts, and the twitter button link
    function getNewQuote() {
       var random = Math.floor(Math.random() * (quotes.length));
       var newColor = colors[Math.floor(Math.random() * (colors.length))];

       $("body").css("background", newColor);
       $("#new-quote").css("background", newColor);


       var q = decodeURIComponent(quotes[random].text);
       var a = decodeURIComponent(quotes[random].author);

       // Twitter link
       twitter.attr("href", "https://twitter.com/intent/tweet?text='" + encodeURIComponent(q) +
                    "'   - " + encodeURIComponent(a) +
                    "&hashtags=quotes&url=https://getquote.herokuapp.com");

       // Fade in animation
       quote.animate({opacity: 0}, 250, function(){ quote.html(q); $(this).animate({opacity: 1}, 500)});
       au.animate({opacity: 0}, 250, function(){ au.html("- " + a); $(this).animate({opacity: 1}, 500)});
    }
});
