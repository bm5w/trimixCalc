import React from 'react';
require("./NumberInput.css");

class NumberInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(this.props.id, event.target.value);
    }

    render() {
        let units = {__html:this.props.units};
        let label = {__html:this.props.label};
        return (
            <div className='row'>
                <label className='header' htmlFor={this.props.id} dangerouslySetInnerHTML={label}></label>
                <input
                    type='number' 
                    id={this.props.id}
                    value={this.props.value}
                    onChange={this.handleChange}
                    label={label}
                    required
                    min={this.props.min ? 
                            this.props.min : undefined}
                    max={this.props.max ? 
                            this.props.max : undefined}
                    step={this.props.step ? 
                            this.props.step : undefined}
                />
                <span dangerouslySetInnerHTML={units}></span>
            </div>
        )

    }
}

export default NumberInput;
