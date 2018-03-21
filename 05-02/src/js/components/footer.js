import React from 'react';

export default class FooterComponent extends React.Component {
    render() {
        const styleComponentFooter = {
            footer: {
                backgroundColor: "#0B5345",
                color: "#FFFFFF",
                "paddingTop": "15px",
                paddingBottom: "15px"
            },
            //还可以定义其他的样式
        };

        return (
            <footer style={styleComponentFooter.footer} className="smallFontSizeFooter">
                <h1>这里是页脚，一般放置版权的一些信息。</h1>
            </footer>
        );
    };
}
