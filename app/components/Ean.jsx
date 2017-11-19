import React from 'react';
import NumberInput from './NumberInput.jsx';
import * as _ from 'lodash';


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
        this.getO2Pressure = this.getO2Pressure.bind(this);
    } 

    onChange(id, value){
        let initialValues = this.state;
        initialValues[id] = value;
        this.setState(initialValues);
    }

    getO2Pressure(){
        let Pi= Number(this.state.initialPressure);
        let Pf= Number(this.state.finalPressure);
        let Ci = Number(this.state.initialO2/100);
        let Cf = Number(this.state.finalO2/100);

        let fillO2Conc = 0.21;
        
        let psiO2 = (Ci*Pf + fillO2Conc*Pi - fillO2Conc*Pf - Ci*Pi)/(1-fillO2Conc);
        return _.round(Pi+psiO2, 0);
    }

    render() {
        let O2Add = this.getO2Pressure();
        return (
            <div>
                <h3>Ean Calculator Test</h3>
                <div>
                <NumberInput
                    onChange={this.onChange}
                    label='tank volume'
                    units='ft^3'
                    id='totalVolume'
                    value={this.state.totalVolume}
                />
                <NumberInput
                    onChange={this.onChange}
                    label='initial pressure'
                    units='psi'
                    id='initialPressure'
                    value={this.state.initialPressure}
                />
                <NumberInput
                    onChange={this.onChange}
                    label='initial O2'
                    units='%'
                    id='initialO2'
                    value={this.state.initialO2}
                    min='0'
                    max='100'
                />
                <NumberInput
                    onChange={this.onChange}
                    label='desired final pressure'
                    units='psi'
                    id='finalPressure'
                    value={this.state.finalPressure}
                />
                <NumberInput
                    onChange={this.onChange}
                    label='desired O2'
                    units='%'
                    id='finalO2'
                    value={this.state.finalO2}
                    min='0'
                    max='100'
                />
                </div>
                {O2Add && 
                    <div>
                        Add O2 to {O2Add} <br/>
                        Add air to {this.state.finalPressure} <br/>
                    </div>}
            </div>
        )
    }
}

export default Ean;
