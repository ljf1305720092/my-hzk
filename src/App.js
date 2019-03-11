import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import './login.css'
import './module/main.css'
import 'semantic-ui-css/semantic.min.css'
import './assets/fonts/iconfont.css'
import Main from './module/main'
import Login from './login'


function Accc (props) {
  // console.log(props)
  let Istoken = sessionStorage.getItem('mytoken')? true: false
  let {path, component:Component} = props
  return (
    <Route path={path} render={()=>{
      let com = Istoken?<Component/> : <Redirect to='/'/>
      return com
    }}></Route>
  )
}

function Abbb (props) {
let {path,component:Component} = props
let Istoken = sessionStorage.getItem('mytoken') ? true:false
  return (
    <Route path={path} render= {() => {
    let sz = Istoken? <Component/>:<Redirect to='/'></Redirect>
    return sz
    }}/>
  )
}

function Aacc () {
  return <div>新来的中的新来的</div>
}
class App extends Component {

  handle = () => {
    
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          {/* <Route path="/home" component={Main}></Route> */}
          <Abbb path='/home' component={Main}></Abbb>
          <Accc path='/abc' component={Aacc}></Accc>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
