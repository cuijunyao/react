import React from 'react';
import {Link} from 'react-router';

export default class HeaderComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            miniHeader: false
        }
    }

    switchHeader(){
        this.setState({miniHeader: !this.state.miniHeader})
    }

    render() {
        const styleHeaderComponent = { // 在 js 里写 css， jsx
            header: {
                backgroundColor: "#0B5345",
                color: "#FFFFFF",
                paddingTop: (this.state.miniHeader)? "3px" : "20px",
                paddingBottom: (this.state.miniHeader) ? "3px" : "20px",
                paddingLeft: "10px",
                paddingRight: '100px'
            },
            //还可以定义其他的样式
        };

        return (
            <header style={styleHeaderComponent.header} className="smallFontSizeHeader" onClick={this.switchHeader.bind(this)}>
                <h1>这里是头部</h1>
                <ul>
                    <li><Link to={`/`}>首页</Link></li>
                    <li><Link to={`/details`}>嵌套的详情页面</Link></li>
                    <li><Link to={`/list`}>列表页面</Link></li>
                </ul>
            </header>
        );
    };
}
