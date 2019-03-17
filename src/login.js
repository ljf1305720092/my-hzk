import React from "react";
import { Form, Icon, Button, Divider } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsername = event => {
    this.setState({
      username: event.target.value
    });
  };
  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  submit = async () => {
    // 获取表单数据
    // 调用后台接口验证数据  http://47.96.21.88:8086/users/login
    // 客户端接收到token信息然后储存到sessionStorage中
    // 页面跳转
    let url = "users/login";
    let ret = await axios.post(url, {
      uname: this.state.username,
      pwd: this.state.password
    });
    let data = ret.data;
    if (data.meta.status === 200) {
      sessionStorage.setItem("mytoken", data.data.token);
      sessionStorage.setItem("uid", ret.data.data.uid);
      let { history } = this.props;
      history.push("/home");
      // console.log(this.props)
    }
    // console.log(data.meta.msg)
  };
  render() {
    return (
      <div className="login-container">
        <div className="login-logo">
          <Icon name="home" size="huge" />
        </div>
        <div className="login-form">
          <Form>
            <Form.Input
              icon="user"
              required
              size="big"
              iconPosition="left"
              name="username"
              value={this.state.username}
              onChange={this.handleUsername}
              placeholder="请输入用户名..."
            />
            <Form.Input
              icon="user"
              required
              size="big"
              iconPosition="left"
              name="password"
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder="请输入密码..."
            />
            <Button onClick={this.submit} fluid color="green">
              登陆
            </Button>
            <Divider horizontal>----</Divider>
          </Form>
        </div>
        <div className="login-third">
          <Icon name="rocketchat" size="big" />
          <Icon name="qq" size="big" />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
