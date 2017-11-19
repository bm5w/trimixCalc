import React from 'react';
require('./Button.css');

class Button extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(this.props.id);
    }
    render() {
        let className = !this.props.disabled ? 'button' : 'button active';
        return (
            <button
                className={className}
                type='submit'
                disabled={this.props.disabled}
                onClick={this.handleChange}
            >
                {this.props.disabled ? 
                    <span className='bold'>{this.props.text}</span> :
                    <span>{this.props.text}</span>
                }
            </button>
        )
    }
}

export default Button;
