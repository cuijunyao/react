import React from 'react';
import ReactDOM from 'react-dom';

import HeaderComponent from "./components/header";
import BodyComponent from "./components/body";
import FooterComponent from "./components/footer";
import 'antd/dist/antd.css';

export default class Index extends React.Component {
    // constructor
    // func1
    // func2
    // ...

    // constructor() {
    //   super();
    //   log.console("123")
    // }

    func1() {

    }

    func2() {

    }

    render() { // 会被自动调用
        /*
        let component;
        if (用户已登录) {
            component = <ComponentLoginedHeader/>
        }
        else {
            component = <ComponentHeader/>
        }
        */

        const styleIndex = { // 在 js 里写 css， jsx
            index: {
                backgroundColor: "#2980B9",
                color: "#00FF00",
                paddingTop: "15px",
                paddingBottom: "15px"
            },
            //还可以定义其他的样式
        };

        return (
            <div>
                <HeaderComponent/>
                <BodyComponent age={10} username={"nick"} userid={1000}/>
                <FooterComponent/>
            </div>
        );
    };
}