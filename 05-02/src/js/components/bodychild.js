import React from 'react';

export default class BodyChild extends React.Component {
    render() {
      return(
        <div>
            <p>子页面的输入：<input type="text" onChange={this.props.handleChildValueChange}/></p>
            <p>{this.props.username} {this.props.age} {this.props.id}</p>
        </div>
      );
    };
}