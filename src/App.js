import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.css';

import Home from './components/Home/Home'
import Single from './components/Single/Single'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path='/' component={Home} />
      <Route exact path='/:id' component={Single} />
      </div>
    );
  }
}

export default App;
