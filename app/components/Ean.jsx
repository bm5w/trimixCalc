import React from 'react';
import NumberInput from './NumberInput.jsx';


class Ean extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVolume: 200,
            initialPressure: 0,
            finalPressure: 3500,
            initialO2: 32,
            finalO2: 32
        };

        this.onChange = this.onChange.bind(this);
    } 

    onChange(id, value){
        let initialValues = this.state;
        initialValues[id] = value;
        this.setState(initialValues);
    }

    render() {
        return (
            <div>
                <h3>Ean Calculator Test</h3>
                <NumberInput
                    onChange={this.onChange}
                    label='tank volume'
                    id='totalVolume'
                    value={this.state.totalVolume}
                />
                <NumberInput
                    onChange={this.onChange}
                    label='initial pressure'
                    id='initialPressure'
                    value={this.state.initialPressure}
                />
                <NumberInput
                    onChange={this.onChange}
                    label='initial O2'
                    id='initialO2'
                    value={this.state.initialO2}
                />
                <NumberInput
                    onChange={this.onChange}
                    label='desired final pressure'
                    id='finalPressure'
                    value={this.state.finalPressure}
                />
                <NumberInput
                    onChange={this.onChange}
                    label='final O2'
                    id='finalO2'
                    value={this.state.finalO2}
                />
            </div>
        )
    }
}

export default Ean;
