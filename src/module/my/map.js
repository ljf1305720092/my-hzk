import React from "react";
import { Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
class Mymap extends React.Component {
  handle = () => {
    // 回退路由：主页
    let { history } = this.props;
    history.goBack();
  };
  initMap = () => {
      // 百度地图API功能
    let BMap = window.BMap;
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            window.BMAP_NORMAL_MAP,
            window.BMAP_HYBRID_MAP
        ]}));	  
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  }
  componentDidMount () {
      this.initMap()
  }
  render() {
    return (
      <div className="map-house">
        <div className="map-house-title">
          <Icon onClick={this.handle} name="angle left" size="large" /> 地图找房
        </div>
        <div className="map-house-content" id="allmap" />
      </div>
    );
  }
}

export default withRouter(Mymap);
