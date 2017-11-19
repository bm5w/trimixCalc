import React from 'react';
import NumberInput from './NumberInput.jsx';
import * as _ from 'lodash';


class Trimix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVolume: 200,
            initialPressure: 0,
            finalPressure: 3500,
            initialO2: 32.0,
            finalO2: 32.0,
            initialHe2: 25.0,
            finalHe2: 25.0,
            fillO2: 20.9
        };

        this.onChange = this.onChange.bind(this);
        this.getO2Pressure = this.getO2Pressure.bind(this);
        this.getHe2Pressure = this.getHe2Pressure.bind(this);
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
        let PHe2 = this.getHe2Pressure()-Pi;
        
        let psiO2 = (Cf*Pf + fillO2Conc*Pi - fillO2Conc*Pf - Ci*Pi + fillO2Conc*PHe2)/(1-fillO2Conc);
        psiO2 = psiO2 + PHe2 + Pi;
        psiO2 = _.round(psiO2, 0);
        return psiO2;
    }

    getHe2Pressure(){
        let Pi= Number(this.state.initialPressure);
        let Pf= Number(this.state.finalPressure);
        let Ci = Number(this.state.initialHe2/100);
        let Cf = Number(this.state.finalHe2/100);

        let fillHe2Conc = 0;
        
        let psiHe2 = (Cf*Pf + fillHe2Conc*Pi - fillHe2Conc*Pf - Ci*Pi)/(1-fillHe2Conc);
        psiHe2 = _.round(Pi+psiHe2, 0);
        return psiHe2;
    }

    render() {
        let He2Add = this.getHe2Pressure();
        let O2Add = this.getO2Pressure();
        return (
            <div>
                <h3>Trimix Calculator</h3>
                <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Pressure</th>
                          <th>O2</th>
                          <th>He2</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                label='initial'
                                units='psi'
                                id='initialPressure'
                                value={this.state.initialPressure}
                                step='100'
                            />
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                label='initial'
                                units='%'
                                id='initialO2'
                                value={this.state.initialO2}
                                min='0'
                                max='100'
                                step='.1'
                            />
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                label='initial'
                                units='%'
                                id='initialHe2'
                                value={this.state.initialHe2}
                                min='0'
                                max='100'
                                step='.1'
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                label='final'
                                units='psi'
                                id='finalPressure'
                                value={this.state.finalPressure}
                                step='100'
                            />
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                label='desired'
                                units='%'
                                id='finalO2'
                                value={this.state.finalO2}
                                min='0'
                                max='100'
                                step='.1'
                            />
                          </td>
                          <td>
                            <NumberInput
                                onChange={this.onChange}
                                label='desired'
                                units='%'
                                id='finalHe2'
                                value={this.state.finalHe2}
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
                        label='source gas O2 concentration'
                        units='%'
                        id='fillO2'
                        value={this.state.fillO2}
                        min='0'
                        max='100'
                        step='.1'
                    />
                </div>
                <div>
                    {(this.state.finalPressure > O2Add && this.state.finalPressure > He2Add) ?
                    <p>
                        Add 100% He2 to <span className="bold">{He2Add}</span>psi <br/>
                        Add 100% O2 to <span className="bold">{O2Add}</span>psi <br/>
                        Add {this.state.fillO2}% to <span className="bold">{this.state.finalPressure}</span>psi <br/>
                    </p> : <p> Impossible to mix </p>}
                </div>
            </div>
        )
    }
}

export default Trimix;
