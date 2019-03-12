import React from "react";
import { Input, Grid, Icon, Item } from "semantic-ui-react";
import ImageGallery from "react-image-gallery";
import axios from 'axios'
import "./index.css";
import "react-image-gallery/styles/css/image-gallery.css";
import cfg from '../../common';
// 菜单组件
function Menu (props) {
    let {menuData} = props
        let menuContent = menuData.map(item => {
            return (
              <Grid.Column key={item.id}>
                  <div className="home-menu-item">
                      <Icon name='home' size='big'></Icon>
                  </div>
                  <div>
                      {item.menu_name}
                  </div>
              </Grid.Column>
            )
        })
        return(
            <Grid columns={4} divided>
                <Grid.Row>
                    {menuContent}
                </Grid.Row>
            </Grid>
        )
}
// 咨询组件
function Info (props) {
    let {infoData} = props;
    let infoContent = infoData.map(item=>{
        return (
        <Item.Header key={item.id}>
            <span>限购 ●</span>
            <span>{item.info_title}</span>
        </Item.Header>
        );
    });
    return (
        <Item.Group unstackable>
      <Item className='home-msg-img' >
        <Item.Image size='tiny' src={cfg.baseURL + 'public/zixun.png'} />
        <Item.Content verticalAlign='top'>
          {infoContent}
          <div className="home-msg-more">
            <Icon name='angle right' size='big' />
          </div>
        </Item.Content>
      </Item>
    </Item.Group>
    )
}

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itams: [],
      menu: [],
      info: []
    };
  }
    loadData = (pathName, dateName) => {
        axios.post(pathName).then(res => {
            this.setState({
                [dateName]: res.data.data.list
            })
        })
    }
  componentDidMount () {
      // 调用接口加载轮播图数据
        this.loadData('/homes/swipe','itams');
        // 调用接口加载菜单数据
        this.loadData('/homes/menu','menu');
        // 调用接口加载咨询数据
        this.loadData('/homes/info','info');
  }
  render() {
    return (
      <div className="home-container">
        <div className="home-topbar">
          <Input fluid icon="search" placeholder="请输入关键词" />
        </div>
        <div className='home-content'>
            {/* 轮播图区域 */}
            <ImageGallery 
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            items={this.state.itams} />
            {/* 菜单区域 */}
            <div>
                <Menu menuData={this.state.menu}></Menu>
            </div>
            {/* 咨询区域 */}
            <div className="home-msg">
                <Info infoData={this.state.info}></Info>
            </div>
            
        </div>
      </div>
    );
  }
}

export default My;
