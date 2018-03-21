import React from 'react';
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
    Modal
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top', // 初始化选中 top 这个 Menu.Item
            hasLogin: false, // 初始化未未登录
            modalVisible: false // 默认不显示模态框
        };
    }

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
        }
    };

    setModalVisible() {
        this.setState({modalVisible: false})
    }

    handleRegister(e) {
        // 页面开始向 API 进行提交数据
        e.preventDefault();
        let myFetchOptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue();
        console.log(formData);
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions
        // ).then(response => response.json()).then(json => {
        //     this.setState({userNickName: json.NickUserName, userid: json.UserId});
        // });
        message.success("注册成功！");
        this.setModalVisible(false);
    };

    handleLogin(e) {
        // 页面开始向 API 进行提交数据
        e.preventDefault();
        let myFetchOptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue();
        console.log(formData);
        // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions
        // ).then(response => response.json()).then(json => {
        //     this.setState({userNickName: json.NickUserName, userid: json.UserId});
        // });
        message.success("登录成功！");
        this.setModalVisible(false);
    };

    render() {
        let {getFieldProps} = this.props.form; // 从表单中获取数据
        const userShow = this.state.hasLogin
            // 已经登录应该显示: 个人中心/退出按钮
            ? <Menu.Item key="logout" className="register">
            </Menu.Item>
            // 未登录应该显示: 登录/注册按钮
            : <Menu.Item key="register" className='register'>
                <Icon type="login"/><strong>登录/注册</strong> {/*图标加文字*/}
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={2}></Col> {/*左边留 2 格空白*/}
                    <Col span={2}>
                        <a href="/" className="logo"> {/* a 标签下的内容均可点击， className 为 img span ... 做样式限制 */}
                            <img src="../../images/logo.png" alt="logo"/>
                            <span>News</span>
                        </a>
                    </Col>
                    <Col span={16}> {/* 24 栅格中要占据的格子数目，也即空间大小 */}
                        <Menu mode="horizontal" selectedKeys={[this.state.current]}
                              onClick={this.handleClick.bind(this)} theme="light">
                            <Menu.Item key="top"> {/* key 用来标识是哪一个 Menu Item */}
                                <Icon type="appstore"/>头条 {/* type 用来标识是当前 Menu Item 的样式类型*/}
                            </Menu.Item>
                            <Menu.Item key="shehui" disabled={true}>
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei" disabled={true}>
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

                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            <Menu.Item/>
                            {userShow}
                        </Menu>

                        {/* 模态框，默认是隐藏的， 弹出时垂直居中屏幕*/}
                        <Modal title="用户中心" wrapClassName="vertical-center-modal"
                               visible={this.state.modalVisible}
                               onCancel={this.handleCancel.bind(this)}
                               onOk={this.handleOk.bind(this)}
                               okText="关闭"
                        >
                            <Tabs defaultActiveKey="1" type="line">
                                <TabPane tab="登录" key="1">
                                    <Form horizontal onSubmit={this.handleLogin.bind(this)}>
                                        <FormItem label="用户名">
                                            <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                        </FormItem>
                                        <FormItem label="密码">
                                            <Input type="password"
                                                   placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form horizontal onSubmit={this.handleRegister.bind(this)}>
                                        <FormItem label="用户名">
                                            <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                        </FormItem>
                                        <FormItem label="密码">
                                            <Input type="password"
                                                   placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            <Input type="password"
                                                   placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col> {/*右边留 2 格空白*/}
                </Row>
            </header>
        );
    };
}

export default PCHeader = Form.create({})(PCHeader) // ？？？
