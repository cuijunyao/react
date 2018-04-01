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

class CommonComments extends React.Component {
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
		console.log( this.props.uniquekey)
    fetch("http://47.104.86.203:8888/api/v1/comments?userId=" + localStorage.userid + "&newsUniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({comments: json});
    });
  };

	handleSubmit(e) {
		e.preventDefault();
		let formdata = this.props.form.getFieldsValue();

		let payload = {
				content: formdata.content,
				memberId: localStorage.userid,
				newsUniquekey: this.props.uniquekey
		};
		let myFetchOptions = {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json;charset=UTF-8'
			},
			body: JSON.stringify(payload)
		};

		fetch("http://47.104.86.203:8888/api/v1/comments", myFetchOptions)
		.then(response => response.json())
		.then(json => {
			// 重新刷新评论列表
			this.componentDidMount();
		})
	}

	addUserCollection() {
		let payload = {
				memberId: localStorage.userid,
				newsUniquekey: this.props.uniquekey
		};
		let myFetchOptions = {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json;charset=UTF-8'
			},
			body: JSON.stringify(payload)
		};
		fetch("http://47.104.86.203:8888/api/v1/collection", myFetchOptions)
		.then(response => response.json())
		.then(json => {
			//收藏成功以后进行一下全局的提醒
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
	}

  render() {
		const {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commnetList = comments.length
    ? comments.map((comment, index) => (
      <Card key={index} title={localStorage.userName} extra={< a href = "#" > 发布于 {comment.createTime} </a>}>
        <font>{comment.content}</font>
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
						<Form onSubmit = {this.handleSubmit.bind(this)}>
								<FormItem lable="您的评论">
										{getFieldDecorator('content', {}) (<Input type="textarea" placeholder="随便写点吧"/>)}
								</FormItem>
								<Button type="primary" htmlType="submit">提交评论
								</Button>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章
								</Button>
						</Form>
          </Col>
          <Col span={2}>
          </Col>
        </Row>
      </div>
    );
  };
}

export default CommonComments = Form.create({})(CommonComments);
