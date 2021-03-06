import React from "react";
import cfg from "../../common";
import { Grid, Icon, Button, Modal  } from "semantic-ui-react";
import "./index.css";
import axios from "axios";
import AvatarEditor from 'react-avatar-editor';

 // 选择图片弹窗封装
 class SelectImageModal extends React.Component {
   constructor (props) {
     super(props);
     // 建立file文件表单引用
     this.fileRef = React.createRef()
     this.state = {
         
     }
   }

   // 去裁切图片
   toCropImage = () => {
     // 获取上传图片的内容
     let fileContent = this.fileRef.current.files[0];
     // 关闭当前窗口，并且打开新的窗口
     this.props.close(fileContent);
   }
  render() {
    let { open, close } = this.props;
    return (
      <div>
        <Modal size='small' open={open} onClose={close}>
          <Modal.Header>选择图片</Modal.Header>
          <Modal.Content>
            <input type="file" ref={this.fileRef} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.toCropImage} positive icon='checkmark' labelPosition='right' content='确定' />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

// 裁切图片弹窗封装
class CropImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1
    }
  }

  setEditorRef = (editor) => {
    // editor表示裁切组件的实例对象
    this.editor = editor;
  }

  submit = async () => {
    // 获取裁切图片的内容
    let image = this.editor.getImageScaledToCanvas();
    // toDataURL方法可以把图片转换为base64编码
    let imgContent = image.toDataURL();
    console.log(imgContent)
    let ret = await axios.post('my/avatar', {
      avatar: imgContent
    });
    console.log(ret)
    // 下一步：关闭窗口、更新图片
    this.props.close(imgContent);
  }

  handleScale = (event) => {
    // 控制比例值的变化
    let num = parseFloat(event.target.value);
    this.setState({
      scale: num
    });
  }
  render() {
    let { open, close, avatar  } = this.props;
    return (
      <div>
        <Modal size='small' open={open} onClose={close}>
          <Modal.Header>裁切图片</Modal.Header>
          <Modal.Content>
            {/* 裁切图片 */}
            <AvatarEditor
              ref={this.setEditorRef}
              borderRadius={75}
              width={150}
              height={150}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              rotate={0}
              scale={this.state.scale}
              image={avatar}
            />
            <div>
              <span className='avatar-zoom'>缩放:</span>
              <input
                name="scale"
                type="range"
                onChange={this.handleScale}
                min='1'
                max='2'
                step="0.01"
                defaultValue="1"
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.submit}  positive icon='checkmark' labelPosition='right' content='确定' />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPath: "",
      uname: "",
      imageFlag: false, // 控制选择图片弹窗的显示和隐藏
      cropFlag: false,  // 控制裁切图片弹窗的显示和隐藏
      avatar: null   // 表示文件的内容
    };
  }
  componentDidMount = async () => {
    // 调用接口获取后台数据
    let uid = sessionStorage.getItem("uid");
    let ret = await axios.post("my/info", {
      user_id: uid
    });
    // 更新数据
    this.setState({
      uname: ret.data.data.username,
      avatarPath: ret.data.data.avatar
    });
  };

   // 隐藏选择图片的弹窗
   closeImageModal = (param) => {
    // 这里要分清两种情况：得到了文件；没有得到文件
    if(param&&param.name) {
      // 得到了文件
      this.setState({
        imageFlag: false, // 关闭选择图片弹窗
        cropFlag: true,   // 显示裁切图片弹窗
        avatar: param
      });
    }else{
      // 没有得到文件
      this.setState({
        imageFlag: false
      });
    }
  }

   // 隐藏裁切图片弹窗
   closeCropModal = (avatarPath) => {
    this.setState({
      cropFlag: false,
      avatarPath: avatarPath // 更新图片路径
    });
  }

  // 显示选择图片的弹窗
  showImageModal = () => {
    this.setState({
      imageFlag: true
    });
  }

  render() {
    return (
      <div className="my-container">
      {/* 弹窗区域 */}
       <SelectImageModal open={this.state.imageFlag} close={this.closeImageModal}/>
       {/* 裁切弹窗区域 */}
       <CropImageModal avatar={this.state.avatar} open={this.state.cropFlag} close={this.closeCropModal}/>
        <div className="my-title">
          <img src={cfg.baseURL + "public/my-bg.png"} alt="me" />
          <div className="info">
            <div className="myicon">
              <img  onClick={this.showImageModal}  src={this.state.avatarPath} alt="icon" />
            </div>
            <div className="name">{this.state.uname}</div>
            <Button color="green" size="mini">
              已认证
            </Button>
            <div className="edit">编辑个人资料</div>
          </div>
        </div>
        <Grid padded className="my-menu">
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name="clock outline" size="big" />
              <div>看房记录</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="yen sign" size="big" />
              <div>我的订单</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="bookmark outline" size="big" />
              <div>我的收藏</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="user outline" size="big" />
              <div>个人资料</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="home" size="big" />
              <div>身份认证</div>
            </Grid.Column>
            <Grid.Column>
              <Icon name="microphone" size="big" />
              <div>联系我们</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="my-ad">
          <img src={cfg.baseURL + "public/ad.png"} alt="" />
        </div>
      </div>
    );
  }
}

export default Home;
