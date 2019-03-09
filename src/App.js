import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';

function Login () {
  return (
    <div>   
        Home
    </div>
  )
}

function Home () {
  
  return <div>Home</div>
}

class App extends Component {

  handle = () => {
    
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
