var React = require('react');
var ReactDOM = require('react-dom');

class Index extends React.Component { // 定义一个 react js class
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
        // var1
        // var2
        // ...
        return (
            <div>
                <h1>Hello World !</h1>
                <h1>Hello React !</h1>
            </div>
        );
    };
}

ReactDOM.render(<Index/>, document.getElementById('example'));
