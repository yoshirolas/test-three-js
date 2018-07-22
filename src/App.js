import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    const canvasSize = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight
    };
    console.log(canvasSize);
  }

  render() {
    return (
      <div 
        className="App"
        ref={container => this.container = container}
      >
      </div>
    );
  }
}

export default App;
