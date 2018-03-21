import React from 'react';
import ReactMixin from 'react-mixin';

import BodyChild from './bodychild'
import MixinLog from './mixins'

export default class BodyComponent extends React.Component {
    constructor() {
        super();
        console.log("init...");

        this.state = { // state 本类的内置属性 key value
            username: "xiaocui",
            age: 30
        }; // 初始化赋值

        console.log(this.state.username)
    }

    changeUserInfo(age) {
        this.setState({age: age});

        console.log(this.refs.submitButton);
        this.refs.submitButton.style.color = 'red';

        MixinLog.log();
    }

    handleChildValueChange(event) {
        this.setState({age: event.target.value})
    }

    func2() {

    }

    render() {
        let userName = 'xiaocui';
        let html1 = "MOOC&nbsp;LESSON";
        let html2 = "MOOC\u0020LESSON";

        // setTimeout(() => { // 超时后执行的逻辑
        //     this.setState({age: 26})
        // }, 4000);

        return (
            <div>
                <h2>页面的主体内容</h2>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{userName == '' ? '用户还没有登录' : '用户名：' + userName}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value={userName}
                                                  disabled={userName == '' ? true : false}/></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{html1}</p> {/*需要进行 Unicode 的转码*/}
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{html2}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.state.username} {this.state.age}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.username} {this.props.age}</p> {/* props 是外来属性，用于接受外部参数*/}
                <input type="button" value="提交"
                       onClick={this.changeUserInfo.bind(this, 99)}/> {/*对 input 标签绑定一个 click 事件*/}
                <BodyChild username={this.state.username} age={this.state.age}
                           handleChildValueChange={this.handleChildValueChange.bind(this)}/> {/*子页面向父页面传递数据*/}
                <BodyChild {...this.props} id={1}
                           handleChildValueChange={this.handleChildValueChange.bind(this)}/> {/*当前页面接到父页面的参数并将接到的参数全部传递给子页面*/}
                <p>接收到的父页面的属性：userid: {this.props.userid} username: {this.props.username}</p>
                <input id="submitButton" ref="submitButton" type="button" value="提交"
                       onClick={this.changeUserInfo.bind(this, 99)}/>
            </div>
        );
    };
}

// BodyComponent.propTypes = {
//     userid: React.PropTypes.number.isRequired
// };

ReactMixin(BodyComponent.prototype, MixinLog);
