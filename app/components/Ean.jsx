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
            initialO2: 32.0,
            finalO2: 32.0,
            fillO2: 20.9
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

        let fillO2Conc = Number(this.state.fillO2/100);
        
        let psiO2 = (Cf*Pf + fillO2Conc*Pi - fillO2Conc*Pf - Ci*Pi)/(1-fillO2Conc);
        return _.round(Pi+psiO2, 0);
    }

    render() {
        let O2Add = this.getO2Pressure();
        return (
            <div className='center'>
              <div>
                <h3>EAN Calculator</h3>
                <div>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Pressure</th>
                          <th>O<sub>2</sub></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span className='bold'>initial:</span>
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                units='psi'
                                id='initialPressure'
                                value={this.state.initialPressure}
                                step='100'
                            />
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                units='%'
                                id='initialO2'
                                value={this.state.initialO2}
                                min='0'
                                max='100'
                                step='.1'
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span className='bold'>final:</span>
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                units='psi'
                                id='finalPressure'
                                value={this.state.finalPressure}
                                step='100'
                            />
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                units='%'
                                id='finalO2'
                                value={this.state.finalO2}
                                min='0'
                                max='100'
                                step='.1'
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <NumberInput
                        onChange={this.onChange}
                        label='source gas O<sub>2</sub> concentration'
                        units='%'
                        id='fillO2'
                        value={this.state.fillO2}
                        min='0'
                        max='100'
                        step='.1'
                    />
                </div>
                {O2Add ? 
                    <div>
                        <p>
                            Add 100% O<sub>2</sub> to <span className="bold">{O2Add}</span>psi <br/>
                            Add {this.state.fillO2}% O<sub>2</sub> to <span className="bold">{this.state.finalPressure}</span>psi <br/>
                        </p>
                    </div> :
                    <div>
                        <p>
                            Add {this.state.fillO2}% O<sub>2</sub> to <span className="bold">{this.state.finalPressure}</span>psi <br/>
                        </p>
                    </div>
                    }
              </div>
            </div>
        )
    }
}

export default Ean;
