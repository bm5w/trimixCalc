var React = require('react');
var ReactDOM = require('react-dom');
Require("./index.css");

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                Hello World!
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

