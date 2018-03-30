import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router'

export default class PCNewsImageBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        };
    };

    componentWillMount() {
        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://47.104.86.203:8888/api/v1/news?contentType=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({news: json})
            });
    };

    render() {
        const imagstyle = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        };

        const h2style = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };

        const {news} = this.state;
        const newsImageList = news.length
            ? news.map((newsItem, index) => (
                <div key={index} className="imageblock">
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div className="custom-image">
                            <img alt="" style={imagstyle} src={newsItem.thumbnailPicture}/>
                        </div>
                        <div className="custom-card">
                            <h4 style={h2style}>{newsItem.title}</h4>
                            <p style={h2style}>{newsItem.authorName}</p>
                        </div>
                    </Link>
                </div>
            ))
            : '没有加载到任何内容';
        return (
            <div>
                <Card title={this.props.cardTitle} bordered={true} style={{width: this.props.width}}>
                    {newsImageList}
                </Card>
            </div>
        );
    };
}
