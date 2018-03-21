import React from 'react';

import {Row, Col} from 'antd';

export default class MobileFooter extends React.Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <col span={20} className="footer">
                        &nbsp;&nbsp;&copy;2018 ReactNews. All Rights Reserved.
                    </col>
                    <col span={2}></col>
                </Row>
            </footer>
        );
    };
}