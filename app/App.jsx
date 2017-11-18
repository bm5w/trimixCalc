import React from 'react';
import ReactDOM from 'react-dom';
import Ean from './components/Ean.jsx';
require("./index.css");

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Trimix Calculator</h3>
                <Ean/>
            </div>
        )
    }
}

export default App;

