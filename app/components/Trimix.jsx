import React from 'react';
import NumberInput from './NumberInput.jsx';
import * as _ from 'lodash';

class Cost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HeCost: 1.00,
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
        let HeP = this.props.HeP;
        let O2V = _.round(this.props.O2P*totalV/workingP, 2);
        let HeV = _.round(this.props.HeP*totalV/workingP, 2);
        let O2Cost = _.round(O2V * this.state.O2Cost, 2);
        let HeCost = _.round(HeV * this.state.HeCost, 2);
        return(
            <div>
              <h4>Cost</h4>
              <div className='center'>
                <table>
                     <thead>
                        <tr>
                          <th></th>
                          <th>O<sub>2</sub></th>
                          <th>He</th>
                        </tr>
                     </thead>
                     <tbody>
                       <tr>
                            <td>
                                Cost ($/Ft<sup>3</sup>)
                            </td>
                            <td>
                                <NumberInput
                                    onChange={this.onChange}
                                    id='O2Cost'
                                    value={this.state.O2Cost}
                                    step='0.01'
                                />
                            </td>
                            <td>
                                <NumberInput
                                    onChange={this.onChange}
                                    id='HeCost'
                                    value={this.state.HeCost}
                                    step='0.01'
                                />
                            </td>
                       </tr>
                       <tr>
                            <td>
                                Volume (Ft<sup>3</sup>)
                            </td>
                            <td>
                                {O2V}
                            </td>
                            <td>
                                {HeV}    
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cost ($)
                            </td>
                            <td>
                                <span className='bold'>{O2Cost}</span>    
                            </td>
                            <td>
                                <span className='bold'>{HeCost}</span>    
                            </td>
                        </tr>
                     </tbody>   
                </table>
               </div>
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
            initialHe: 45.0,
            finalHe: 45.0,
            fillO2: 32.0
        };

        this.onChange = this.onChange.bind(this);
        this.getO2Pressure = this.getO2Pressure.bind(this);
        this.getHePressure = this.getHePressure.bind(this);
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
        let PHe = this.getHePressure()-Pi;
        
        let psiO2 = (Cf*Pf + fillO2Conc*Pi - fillO2Conc*Pf - Ci*Pi + fillO2Conc*PHe)/(1-fillO2Conc);
        psiO2 = psiO2 + PHe + Pi;
        psiO2 = _.round(psiO2, 0);
        return psiO2;
    }

    getHePressure(){
        let Pi= Number(this.state.initialPressure);
        let Pf= Number(this.state.finalPressure);
        let Ci = Number(this.state.initialHe/100);
        let Cf = Number(this.state.finalHe/100);

        let fillHeConc = 0;
        
        let psiHe = (Cf*Pf + fillHeConc*Pi - fillHeConc*Pf - Ci*Pi)/(1-fillHeConc);
        psiHe = _.round(Pi+psiHe, 0);
        return psiHe;
    }

    render() {
        let HeAdd = this.getHePressure();
        let O2Add = this.getO2Pressure();
        let O2P = O2Add-HeAdd;
        let HeP = HeAdd-this.state.initialPressure;
        return (
            <div className='center'>
              <div>
                <h2>Trimix Calculator</h2>
                <div>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Pressure</th>
                          <th>O<sub>2</sub></th>
                          <th>He</th>
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
                                id='initialHe'
                                value={this.state.initialHe}
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
                                id='finalHe'
                                value={this.state.finalHe}
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
                    {(this.state.finalPressure > O2Add && this.state.finalPressure > HeAdd && O2Add > HeAdd) ?
                    <p>
                        Add 100% He to <span className="bold">{HeAdd}</span>psi <br/>
                        Add 100% O<sub>2</sub> to <span className="bold">{O2Add}</span>psi <br/>
                        Add {this.state.fillO2}% O<sub>2</sub> to <span className="bold">{this.state.finalPressure}</span>psi <br/>
                    </p> : <p> Impossible to mix </p>}
                </div>
                <div className='alignRight'>
                    <NumberInput
                        onChange={this.onChange}
                        label='cylinder volume'
                        units='Ft<sup>3</sup>'
                        id='totalVolume'
                        value={this.state.totalVolume}
                    />
                </div>
                <div className='alignRight'>
                    <NumberInput
                        onChange={this.onChange}
                        label='cylinder working pressure'
                        units='psi'
                        id='workingPressure'
                        value={this.state.workingPressure}
                    />
                </div>
                <Cost 
                    totalVolume={this.state.totalVolume} 
                    workingPressure={this.state.workingPressure}
                    O2P={O2P}
                    HeP={HeP}
                />
              </div>
            </div>
        )
    }
}

export default Trimix;
