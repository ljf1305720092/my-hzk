import React from "react";
import { Tab, Item } from "semantic-ui-react";
import "./index.css";
import LoadMore from './loadmore'

// 咨询组件
// class InfoContent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       infoData: [],
//       pagenum:0,
//       pagesize: 2,
//     }
//   }
//   componentDidMount = async () => {
//    let ret =  await axios.post('infos/list', {
//       pagenum: this.state.pagenum,
//       pagesize: this.state.pagesize,
//       type: this.state.type
//     })
//     // console.log(ret)
//     this.setState ({
//       infoData: ret.data.data.list.data
//     })
//   }
//   render() {
//     let infoContent = this.state.infoData.map(item => {
//       return (
//         <Item key={item.id}>
//         <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
//         <Item.Content verticalAlign='middle'>
//           <Item.Header className='info-title'>{item.info_title}</Item.Header>
//           <Item.Meta>
//             <span className='price'>$1200</span>
//             <span className='stay'>1 Month</span>
//           </Item.Meta>
//         </Item.Content>
//       </Item>
//       )
//     })
//     return (
//       <div>
//         {infoContent}
//       </div>
//     )
//   }
// }
// 咨询组件
 function InfoContent () {
   let param = {
     type: 1
   }

   return <LoadMore param = {param}/>
 } 
//  头条组件
 function FaqContent () {
   let param = {
     type: 2
   }

   return <LoadMore param = {param}/>
 } 
//  问答组件
 function TopContent () {
   let param = {
     type: 3
   }

   return <LoadMore param = {param}/>
 } 

// // 头条组件
// class FaqContent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }
//   render() {
//     return <div>头条</div>
//   }
// }

// 问答组件
// class TopContent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {

//     }
//   }
//   render() {
//     return <div>问答</div>
//   }
// }

class Info extends React.Component {
  render() {
    const panes = [
      { menuItem: '资讯', render: () => <Tab.Pane><InfoContent/></Tab.Pane>},
      { menuItem: '头条', render: () => <Tab.Pane><FaqContent/></Tab.Pane>},
      { menuItem: '问答', render: () => <Tab.Pane><TopContent/></Tab.Pane>}
    ];
    return (
        <div className="find-container">
          <div className="find-topbar">资讯</div>
          <div className="find-content">
            <Tab panes={panes} />
          </div>
        </div>
    );
  }
}

export default Info;
