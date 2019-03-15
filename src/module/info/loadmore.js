import React from "react";
import Tloader from "react-touch-loader";
import { Item, Icon, Button, Modal, TextArea } from "semantic-ui-react";
import "./loadmore.css";
import axios from "axios";

// 封装弹窗组件
class QuestionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          info: ''
        }
      }
    
      handleInfo = (event) => {
        this.setState({
          info: event.target.value
        });
      }
    
      submit = async () => {
        // 完成提交
        let ret = await axios.post('infos/question', {
          question: this.state.info
        });
        if(ret.data.meta.status !== 200) {
          // alert(ret.data.meta.msg);
          alert('服务器发生错误，请与管理员联系 daniu@qq.com');
        }
        // 隐藏弹窗
        this.props.close();
      }
  render() {
    // open是状态位：控制弹窗的显示或者隐藏
    // close是一个函数，隐藏弹窗的时候触发
    let { open, close } = this.props;
    return (
      <div>
        <Modal size="small" open={open} onClose={close}>
          <Modal.Header>发表评论</Modal.Header>
          <Modal.Content>
            <TextArea value={this.state.info} onChange={this.handleInfo} style={{ width: "100%" }} placeholder="Tell us more" />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>
              取消
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="发表"
              onClick={this.submit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true, // 是否还有更多数据
      initializing: 1, // 开启进度条
      listData: [],
      pagenum: 0,
      pagesize: 2,
      total: 0,
      openFlag: false // 控制弹窗显示或者隐藏
    };
  }
  //   封装数据的刷新
  loadData = async flag => {
    let { param } = this.props;
    let { pagenum, pagesize } = this.state;
    // 加载列表数据
    let ret = await axios.post("infos/list", {
      pagenum: pagenum,
      pagesize: pagesize,
      type: param.type
    });
    let arr = [...this.state.listData];
    if (flag === 1) {
      // 刷新
      arr = [...ret.data.data.list.data];
    } else {
      arr.push(...ret.data.data.list.data);
    }
    // console.log(ret)
    this.setState({
      listData: arr,
      total: ret.data.data.list.total,
      initializing: 2
    });
  };

  componentDidMount = () => {
    this.loadData(1);
  };
  // 实现刷新操作
  refresh = resolve => {
    this.setState(
      {
        pagenum: 0
      },
      () => {
        this.loadData(1);
      }
    );
    resolve(); // 必须调用这个函数表示任务完成
  };
  // 实现加载更多 每次加载要累加怕个num 并且每次加载更新listData；还要处理hasMore判断是否还要更多数据
  loadMore = resolve => {
    let pn = this.state.pagenum + this.state.pagesize;
    this.setState(
      {
        pagenum: pn,
        hasMore: pn < this.state.total
      },
      () => {
        this.loadData(2);
      }
    );
    resolve();
  };

  // 关闭弹窗
  closeWindow = () => {
    this.setState({
      openFlag: false
    });
  };

  // 显示弹窗
  showWindow = () => {
    this.setState({
      openFlag: true
    });
  };
  //   生成列表内容
  produceList = type => {
    let listContent = [];
    this.state.listData.forEach(item => {
      let itemInfo = null;
      if (type === 1 || type === 2) {
        itemInfo = (
          <Item key={item.id}>
            <Item.Image
              size="small"
              src="http://47.96.21.88:8086/public/1.png"
            />
            <Item.Content verticalAlign="middle">
              <Item.Header className="info-title">
                {item.info_title}
              </Item.Header>
              <Item.Meta>
                <span className="price">$1200</span>
                <span className="stay">1 Month</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        );
      } else if (type === 3) {
        // 问答模块
        itemInfo = (
          <li key={item.id}>
            <div className="title">
              <span className="cate">
                <Icon color="green" name="users" size="small" />
                思维
              </span>
              <span>{item.question_name}</span>
            </div>
            {item.answer_content && (
              <div className="user">
                <Icon circular name="users" size="mini" />
                {item.username} 的回答
              </div>
            )}
            <div className="info">{item.answer_content}</div>
            <div className="tag">
              {item.question_tag &&
                item.question_tag.split(",").map((tag, index) => {
                  return <span key={index}>{tag}X</span>;
                })}
              <span>{item.qnum ? item.qnum : 0}个回答</span>
            </div>
          </li>
        );
      }
      listContent.push(itemInfo);
    });
    if (type === 1 || type === 2) {
      return <Item.Group unstackable>{listContent}</Item.Group>;
    } else {
      return (
        <div>
          <QuestionModal open={this.state.openFlag} close={this.closeWindow} />
          <div className="info-ask-btn">
            <Button fluid color="green" onClick={this.showWindow}>
              快速提问
            </Button>
          </div>
          <ul className="info-ask-list">{listContent}</ul>
        </div>
      );
    }
  };
  render() {
    let { hasMore, initializing } = this.state;
    let { param } = this.props;
    // console.log(this.produceList(param.type))
    return (
      <div className="view">
        <Tloader
          className="main"
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={hasMore}
          initializing={initializing}
        >
          <ul>{this.produceList(param.type)}</ul>
        </Tloader>
      </div>
    );
  }
}

export default LoadMore;
