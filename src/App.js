import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './login.css'
import 'semantic-ui-css/semantic.min.css'
import Main from './module/my/main'
import Login from './login'


class App extends Component {

  handle = () => {
    
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/home" component={Main}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
