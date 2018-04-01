import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'

import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Modal,
    Checkbox,
    Tooltip,
    Select
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
const Option = Select.Option;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top', // 初始化选中 top 这个 Menu.Item
            hasLogin: false, // 初始化未未登录
            modalVisible: false, // 默认不显示模态框
            confirmDirty: false,
            autoCompleteResult: [],
            disabledRegisterButton: true,
            action: 'login',
            userName: '',
            userid: '',
            loginStatus: 0,
            registerStatus: 0
        };
    }

    componentWillMount() {
        if (localStorage.userid != '') {
            console.log(localStorage.userid);
            console.log(localStorage.userName);
            this.setState({
                hasLogin: true,
                userName: localStorage.userName,
                userid: localStorage.userid
            });
        }
    };

    showModal() {
        this.setState({modalVisible: true});
    }

    handleOk(e) {
        this.setState({modalVisible: false});
    }

    handleCancel(e) {
        this.setState({modalVisible: false});
    }

    handleClick(e) { // e 是 Menu.Item
        this.setState({current: e.key});
        if (e.key === "register") {
            this.showModal();
        } else if (e.key === "logout") {
            // 清空本地数据
            localStorage.userid = '';
            localStorage.userName = '';
            this.setState({hasLogin: false})
        } else if (e.key === "user-center") {
            // 跳转到用户详情页
            console.log("user-center")
        }
    };

    setModalVisible() {
        this.setState({modalVisible: false})
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    handleSubmit(e) {
        // 页面开始向 API 进行提交数据
        e.preventDefault();
        let formData = this.props.form.getFieldsValue();
        if (this.state.action === "login") {
            if (formData.userName !== '' && formData.password !== '') {
                fetch("http://47.104.86.203:8888/api/v1/user?userName="
                    + formData.userName + "&password=" + formData.password, {
                    method: "GET"
                }).then(response => {
                    if (response.status === 200) {
                        this.setState({loginStatus: 200});
                        return response.json();
                    } else if (response.status === 404) {
                        message.error("该用户还未注册!", 3);
                    } else if (response.status === 403) {
                        message.error("密码错误!", 3);
                    }
                }).then(json => {
                    if (this.state.loginStatus === 200) {
                        localStorage.userid = json.id;
                        localStorage.userName = json.userName;
                        this.setState({
                            hasLogin: true,
                            userName: json.userName,
                            userid: json.id
                        });
                        message.success("登录成功!", 2);
                        this.setModalVisible(false);
                    }
                });
            } else {
                message.error("请输入登录名和密码!", 3);
            }
        } else {
            const userName = formData.userName;
            const email = formData.email;
            const password = formData.password;
            const confirm = formData.confirm;
            if (userName !== '' && userName !== undefined &&
                email !== '' && email !== undefined &&
                password !== '' && password !== undefined &&
                confirm !== '' && confirm !== undefined) {
                let payload = {
                    userName: userName,
                    email: email,
                    password: password
                };
                fetch("http://47.104.86.203:8888/api/v1/user", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(payload)
                }).then(response => {
                    if (response.status === 200) {
                        this.setState({registerStatus: 200});
                        return response.json();
                    } else if (response.status === 403) {
                        message.error("该用户已被注册!", 3);
                    }
                }).then(json => {
                    if (this.state.registerStatus === 200) {
                        localStorage.userid = json.id;
                        localStorage.userName = json.userName;
                        this.setState({
                            hasLogin: true,
                            userName: json.userName,
                            userid: json.id
                        });
                        message.success("注册成功!");
                        this.setModalVisible(false);
                        //TODO 自动跳转到首页
                    }
                });
            }
            else {
                message.error("请输入完整的注册信息!", 3);
            }
        }
    };

    handleAgreeOnChange(e) {
        const value = e.target.checked;
        this.setState({disabledRegisterButton: !value});
    }

    selectTabCallback(key) { // 先执行 callback 后执行 handleSubmit
        if (key === "1") {
            this.setState({action: 'login'});
        } else if (key === "2") {
            this.setState({action: 'register'});
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form; // 从表单中获取数据
        const userShow = this.state.hasLogin
            // 已经登录应该显示: 个人中心 退出按钮 昵称
            ?
            <SubMenu key="submenu" title={<span> <Icon type="user" style={{
                fontSize: 21,
                color: '#08c'
            }}/> {this.state.userName}</span>}>
                <Menu.Item key="user-center">
                    <Link target="_blank" to={`/usercenter`}>个人中心</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <Icon type="logout" style={{fontSize: 17, color: '#08c'}}/>退出
                </Menu.Item>
            </SubMenu>

            // 未登录应该显示: 登录/注册按钮
            : <Menu.Item key="register" className='register'>
                <Icon type="login" style={{fontSize: 17, color: '#08c'}}/><strong>登录/注册</strong>
            </Menu.Item>;

        const formItemLayout = {
            labelCol: {
                offset: 100,
                sm: {span: 8},
            },
            wrapperCol: {
                offset: 0,
                sm: {span: 16},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                sm: {
                    span: 16,
                    offset: 0,
                },
            },
        };

        return (
            <header>
                <Row>
                    <Col span={2}></Col> {/*左边留 2 格空白*/}
                    <Col span={4}>
                        <a href="/" className="logo"> {/* a 标签下的内容均可点击， className 为 img span ... 做样式限制 */}
                            <img src="../../images/logo.png" alt="logo"/>
                            <span>News</span>
                        </a>
                    </Col>
                    <Col span={16}> {/* 24 栅格中要占据的格子数目，也即空间大小 */}
                        <Menu mode="horizontal" selectedKeys={[this.state.current]}
                              onClick={this.handleClick.bind(this)} theme="light">
                            <Menu.Item key="top"> {/* key 用来标识是哪一个 Menu Item */}
                                <Icon type="appstore"/>首页 {/* type 用来标识是当前 Menu Item 的样式类型*/}
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="s1">
                            </Menu.Item>
                            <Menu.Item key="s2">
                            </Menu.Item>
                            <Menu.Item key="s3">
                            </Menu.Item>
                            <Menu.Item key="s4">
                            </Menu.Item>
                            {userShow}

                            {/* 模态框，默认是隐藏的， 弹出时垂直居中屏幕*/}
                            <Modal title="用户中心" wrapClassName="vertical-center-modal"
                                   visible={this.state.modalVisible}
                                   onCancel={this.handleCancel.bind(this)}
                                   onOk={this.handleOk.bind(this)}
                                   okText="close"
                            >
                                <Tabs defaultActiveKey="1" type="line" onChange={this.selectTabCallback.bind(this)}>
                                    <TabPane tab="登录" key="1" className="login-tab-pan">
                                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                            <FormItem>
                                                {getFieldDecorator('userName', {
                                                    rules: [{required: true, message: 'Please input your username!'}],
                                                })
                                                (
                                                    <Input
                                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        placeholder="Username"/>
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('password', {
                                                    rules: [{required: true, message: 'Please input your Password!'}],
                                                })(
                                                    <Input
                                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                        type="password" placeholder="Password"/>
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox>Remember me</Checkbox>
                                                )}
                                                <a className="login-form-forgot" href="">Forgot password</a>
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                    Log in
                                                </Button>
                                            </FormItem>
                                        </Form>
                                    </TabPane>

                                    <TabPane tab="注册" key="2">
                                        <Form onSubmit={this.handleSubmit.bind(this)} className="register-form">
                                            <FormItem   {...formItemLayout}
                                                        label={(
                                                            <span>Nickname&nbsp;
                                                                <Tooltip title="What do you want others to call you?">
                                                                    <Icon type="question-circle-o"/>
                                                                </Tooltip>
                                                            </span>
                                                        )}
                                            >
                                                {getFieldDecorator('userName', {
                                                    rules: [{required: true, message: 'Please input your username!'}],
                                                })
                                                (
                                                    <Input/>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="E-mail">
                                                {getFieldDecorator('email', {
                                                    rules: [{
                                                        type: 'email', message: 'The input is not valid E-mail!',
                                                    }, {
                                                        required: true, message: 'Please input your E-mail!',
                                                    }],
                                                })(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="Password">
                                                {getFieldDecorator('password', {
                                                    rules: [{
                                                        required: true, message: 'Please input your password!',
                                                    }, {
                                                        validator: this.validateToNextPassword.bind(this),
                                                    }],
                                                })(
                                                    <Input type="password"/>
                                                )}
                                            </FormItem>
                                            <FormItem {...formItemLayout} label="Confirm Password">
                                                {getFieldDecorator('confirm', {
                                                    rules: [{
                                                        required: true, message: 'Please confirm your password!',
                                                    }, {
                                                        validator: this.compareToFirstPassword.bind(this),
                                                    }],
                                                })(
                                                    <Input type="password" onBlur={this.handleConfirmBlur.bind(this)}/>
                                                )}
                                            </FormItem>
                                            <FormItem {...tailFormItemLayout}>
                                                {getFieldDecorator('agreement', {
                                                    valuePropName: 'checked',
                                                    initialValue: false,
                                                })(
                                                    <Checkbox onChange={this.handleAgreeOnChange.bind(this)}>
                                                        I have read the <a href="">agreement</a></Checkbox>
                                                )}
                                            </FormItem>
                                            <Button type="primary" htmlType="submit" className="login-form-button"
                                                    disabled={this.state.disabledRegisterButton}>
                                                Register
                                            </Button>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader)
