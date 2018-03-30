import React from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
	notification
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router'

export default class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: ''
    };
  };

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://47.104.86.203:8888/api/v1/comments?userId=" + localStorage.userid + "&newsUniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({comments: json});
    });
  };

  render() {
    const {comments} = this.state;
    const commnetList = comments.length
    ? comments.map((comment, index) => (
      <Card key={index} title={localStorage.userName} extra={< a href = "#" > 发布于 {comment.createTime} </a>}>
        <p>{comment.content}</p>
      </Card>
    ))
    : '没有加载到任何评论';

    return(
      <div className="comment">
        <Row>
          <Col span={2}>
          </Col>
          <Col span={20}>
            {commnetList}
          </Col>
          <Col span={2}>
          </Col>
        </Row>
      </div>
    );
  };
}

// export default CommonComments = Form.create({})(CommonComments);
