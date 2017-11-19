import React from 'react';
import NumberInput from './NumberInput.jsx';
import * as _ from 'lodash';

class Cost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            He2Cost: 1.00,
            O2Cost: .10,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(id, value) {
        let initialValues = this.state;
        initialValues[id] = value
        this.setState(initialValues);
    }

    render() {
        let totalV= this.props.totalVolume;
        let workingP= this.props.workingPressure;
        let O2P = this.props.O2P;
        let He2P = this.props.He2P;
        let O2V = _.round(this.props.O2P*totalV/workingP, 2);
        let He2V = _.round(this.props.He2P*totalV/workingP, 2);
        let O2Cost = _.round(O2V * this.state.O2Cost, 2);
        let He2Cost = _.round(He2V * this.state.He2Cost, 2);
        return(
            <div className='center'>
                <h4>Cost</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Cost ($/Ft<sup>3</sup>)</th>
                            <th>Volume (Ft<sup>3</sup>)</th>
                            <th>Cost ($)</th>
                        </tr>
                     </thead>
                     <tbody>
                       <tr>
                            <td>
                                <NumberInput
                                    onChange={this.onChange}
                                    label='He<sub>2</sub>'
                                    id='He2Cost'
                                    value={this.state.He2Cost}
                                    step='0.01'
                                />
                            </td>
                            <td>
                                {He2V}    
                            </td>
                            <td>
                                <span className='bold'>{He2Cost}</span>    
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <NumberInput
                                    onChange={this.onChange}
                                    label='O<sub>2</sub>'
                                    id='O2Cost'
                                    value={this.state.O2Cost}
                                    step='0.01'
                                />
                            </td>
                            <td>
                                {O2V}
                            </td>
                            <td>
                                <span className='bold'>{O2Cost}</span>    
                            </td>
                        </tr>
                     </tbody>   
                </table>
             </div>
        )
    }
}

class Trimix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVolume: 200,
            workingPressure: 3442,
            initialPressure: 0,
            finalPressure: 3500,
            initialO2: 18.0,
            finalO2: 18.0,
            initialHe2: 45.0,
            finalHe2: 45.0,
            fillO2: 32.0
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
        let O2P = O2Add-He2Add;
        let He2P = He2Add-this.state.initialPressure;
        return (
            <div className='center'>
              <div>
                <h3>Trimix Calculator</h3>
                <div>
                    <div>
                        <NumberInput
                            onChange={this.onChange}
                            label='cylinder volume'
                            units='Ft<sup>3</sup>'
                            id='totalVolume'
                            value={this.state.totalVolume}
                        />
                    </div>
                    <div>
                        <NumberInput
                            onChange={this.onChange}
                            label='cylinder working pressure'
                            units='psi'
                            id='workingPressure'
                            value={this.state.workingPressure}
                        />
                    </div>
                    
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Pressure</th>
                          <th>O<sub>2</sub></th>
                          <th>He<sub>2</sub></th>
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
                          <td>
                            <NumberInput
                                onChange={this.onChange}
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
                          <td>
                            <NumberInput
                                onChange={this.onChange}
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
                        label='source gas O<sub>2</sub> concentration'
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
                        Add 100% He<sub>2</sub> to <span className="bold">{He2Add}</span>psi <br/>
                        Add 100% O<sub>2</sub> to <span className="bold">{O2Add}</span>psi <br/>
                        Add {this.state.fillO2}% O<sub>2</sub> to <span className="bold">{this.state.finalPressure}</span>psi <br/>
                    </p> : <p> Impossible to mix </p>}
                </div>
                <Cost 
                    totalVolume={this.state.totalVolume} 
                    workingPressure={this.state.workingPressure}
                    O2P={O2P}
                    He2P={He2P}
                />
              </div>
            </div>
        )
    }
}

export default Trimix;
