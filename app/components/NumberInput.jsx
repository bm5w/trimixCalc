import React from 'react';


class NumberInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(this.props.id, event.target.value);
    }

    render() {
        return (
            <div>
                <label className='header' htmlFor={this.props.id}>{this.props.label}</label>
                <input
                    type='text' 
                    id={this.props.id}
                    value={this.props.value}
                    onChange={this.handleChange}
                    label={this.props.label}
                />
            </div>
        )

    }
}

export default NumberInput;
// +        <input
//  +          id='username'
//  +          placeholder='github username'
//  +          type='text'
//  +          value={this.props.value}
//  +          autoComplete='off'
//  +          onChange={this.handleChange}
//  +        />
