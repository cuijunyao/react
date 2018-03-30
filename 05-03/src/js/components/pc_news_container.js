import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
import PCNewsImageBlock from './pc_news_image_block'
import PCNewsBlock from './pc_news_blocks'

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="container">
                        <div className="leftContainer">
                                <Carousel {...settings}>
                                    <div className="pic-div"><img src="../../images/1.jpg"/></div>
                                    <div className="pic-div"><img src="../../images/2.jpg"/></div>
                                    <div className="pic-div"><img src="../../images/3.jpg"/></div>
                                    <div className="pic-div"><img src="../../images/4.jpg"/></div>
                                </Carousel>
                                <PCNewsImageBlock count={4} type="wangyi_hot" width="300px" cardTitle="网易热门" imageWidth="115px"/>
                        </div>
                        <Tabs className="tabs_news">
                            <TabPane tab="知乎热门" key="1">
                                <PCNewsBlock count={10} type="zhihu_hot" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="网易热门" key="2">
                                <PCNewsBlock count={10} type="wangyi_hot" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}
