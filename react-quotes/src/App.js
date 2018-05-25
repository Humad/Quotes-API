import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      quote: "",
      author: "",
      currentColor: ""
    }

    this.buttonText = "Get new quote!";

    this.quotesURL = window.location.href + "get";

    this.colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6",
    "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857",
    "#BCCF02", "#5BB12F", "#73C5FF", "#9B539C", "#EB65A0", "#69D2E7",
    "#A7DBDB", "#E0E4CC", "#F38630", "#FA6900"];

    this.twitterLink = "";
    
  }

  componentDidMount() {
    this.getNewQuote();
  }

  getTwitterLink() {
    return "https://twitter.com/intent/tweet?text='" + encodeURIComponent(this.state.quote) +
    "'   - " + encodeURIComponent(this.state.author) +
    "&hashtags=quotes&url=https://getquote.herokuapp.com";
  }

  getNewColor() {
    return this.colors[Math.floor(Math.random() * (this.colors.length))];
  }

  getNewQuote() {

    console.log("Called get new quote");

    axios.get("http://getquote.herokuapp.com/get")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.dir(error);
    });



    // get quote
    // get author
    // decode uri components
    // set state
  }

  render() {
    return (
      <div class="container">
         <div id="box">
            <i class="fa fa-quote-left"></i>
            <span id="quote">{this.state.quote}</span>
            <h4 id="author">{this.state.author}</h4>
            <button class="btn" id="new-quote" onClick={() => this.getNewQuote()} >{this.buttonText}}</button>
            <a class="btn btn-social-icon btn-twitter" id="tweet" target="_blank" href={this.getTwitterLink()}>
               <span class="fa fa-twitter"></span> Tweet me!
            </a>
         </div>
      </div>
    );
  }
}

export default App;
