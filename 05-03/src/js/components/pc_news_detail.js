import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments'

export default class PCNewsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      newsItem: ''
    }
  }

  componentDidMount() {
    let myFetchOptions = {
      method: 'GET'
    };
    fetch("http://47.104.86.203:8888/api/v1/news/" + this.props.params.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({newsItem: json});
      document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
    });
  }

  createMarkup() {
    return {__html: this.state.newsItem.content};
  };

  render() {
    return (
      <div>
        <PCHeader/>
        <Row className="detail-container">
          <Col span={2} ></Col>
          <Col span={14}>
              <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

              <hr></hr>
              <CommonComments uniquekey={this.props.params.uniquekey} />
          </Col>
          <Col span={6} className="detail-news-block">
              <PCNewsImageBlock count={8} type="wangyi_hot" width="300px" cardTitle="相关新闻" imageWidth="115px"/>
          </Col>
          <Col span={2}></Col>
        </Row>

        <PCFooter/>
        <BackTop/>
      </div>
    );
  };



}
