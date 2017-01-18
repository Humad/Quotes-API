$(document).ready(function(){
    $('#form').submit(function () {
        addNewQuote();
    });

    // Encodes the quote and author text and sends them to the server
    function addNewQuote() {
        var quote = encodeURIComponent(document.getElementById("quote").value);
        var author = encodeURIComponent(document.getElementById("author").value);
        finalize(quote, author);
    }

    // Sends a POST request to the server to save the quote in the database
    function finalize(quote, author) {
        $.ajax({
            type: "POST",
            url: window.location.href, // https://urlHere/add/
            dataType: "json",
            data: {quote: quote, author: author},
            success: function(data){
                console.log("Success!");
            },
            error: function(err){
                console.log(err.toString());
            }
        });
    }
});
