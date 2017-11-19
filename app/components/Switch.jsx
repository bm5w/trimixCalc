import React from 'react';
import Ean from './Ean.jsx';
import Trimix from './Trimix.jsx';
import Button from './Button.jsx';

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EAN: true,
            Trimix: false
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(id) {
        let initial = this.state;
        initial.EAN = !initial.EAN
        initial.Trimix = !initial.Trimix
        this.setState(initial);
    }

    render() {
        let EANOn = this.state.EAN;
        return (
            <div>
                <div className='buttons'>
                    <Button
                        disabled={this.state.EAN}
                        text='EAN'
                        id='EAN'
                        onChange={this.onChange}
                    />
                    <Button
                        disabled={this.state.Trimix}
                        text='Trimix'
                        id='Trimix'
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    {EANOn ? <Ean/> : <Trimix/>}
                </div>
            </div>
        )
    }
}

export default Switch;

