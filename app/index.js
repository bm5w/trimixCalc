var React = require('react');
var ReactDOM = require('react-dom');
require("./index.css");

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                Trimix Calculator
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

