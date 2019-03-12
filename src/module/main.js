// 整体布局
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, Link, Switch } from "react-router-dom";
import './main.css';
import My from './my/index'
import Info from './info/index'
import Home from './home/index'
import Chat from './chat/index'
// 自定义组件：只要有链接出发，children对应的函数就会调用
function Menu (props) {
    // console.log(props);
    let {path, uname, icon} = props
    return (
        <Route path={path} children={({match})=>{
            // console.log(match)
            let iconClass = `iconfont icon-${icon}`
            iconClass = match? iconClass +' active': iconClass
            // console.log(iconClass)
            return (
                <Link to={path}>
                <div className='placeholder'>
                    <i className={iconClass}></i>
                    <div className={match?'active':''}>{uname}</div>
                </div>
            </Link>
            )
        }}>  
        </Route>
    )
}

class Main extends React.Component {
    render() {
        return (
            <div className='home-container'>
                <div className='home-content'>
                    <Switch>
                        <Route path='/home/cd' component={My}></Route>
                        <Route path='/home/zx' component={Info}></Route>
                        <Route path='/home/wl' component={Home}></Route>
                        <Route path='/home/wd' component={Chat}></Route>
                    </Switch>
                </div>
                <div className='home-menu'>
                    <Grid columns={4} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Menu path='/home/cd' uname='主页' icon='all'></Menu>
                            </Grid.Column>
                            <Grid.Column>
                                <Menu path='/home/zx' uname='咨询' icon='search'></Menu>
                            </Grid.Column>
                            <Grid.Column>
                                <Menu path='/home/wl' uname='微聊' icon='atm'></Menu>
                            </Grid.Column>
                            <Grid.Column>
                                <Menu path='/home/wd' uname='我的' icon='account'></Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Main;