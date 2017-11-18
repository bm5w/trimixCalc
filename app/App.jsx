import React from 'react';
import ReactDOM from 'react-dom';
import Ean from './components/Ean.jsx';
import Trimix from './components/Trimix.jsx';
require("./index.css");

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Ean/>
                <Trimix/>
            </div>
        )
    }
}

export default App;

