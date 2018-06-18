import React, { Component } from 'react';
import './App.css';
import QuotesText from './components/QuotesText';

class App extends Component {

  constructor() {
    super();
  }

  // componentDidUpdate() {
  //   document.body.style.backgroundColor = this.state.currentColor;
  // }

  render() {
    return (
      <div className="container">
         <div id="box">
            <QuotesText />
         </div>
      </div>
    );
  }
}

export default App;