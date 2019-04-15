import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import FormFilling from './FormFilling';

class App extends Component {
  render() {
    return (
      <div className="container">
        <FormFilling />
      </div>
    );
  }
}

export default App;
