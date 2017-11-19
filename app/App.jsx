import React from 'react';
import ReactDOM from 'react-dom';
import Switch from './components/Switch.jsx';
require("./index.css");

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (

            <div>
                <Switch/>
            </div>
        )
    }
}

export default App;

