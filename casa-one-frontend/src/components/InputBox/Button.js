import React, { Component } from 'react';
import _ from 'lodash';

class Button extends Component{
    constructor(props){
        super(props);
        this.state = {
            textValue: null,
        }
    }


    render(){
        return(
            
                
                (this.props.showButton 
                    ? 
                <input 
                    type={this.props.type} 
                    className={this.props.className} 
                    value={this.props.placeholder}
                    onClick={this.props.functionToCall.bind(this)} 
                />
                    :
                null
                )
            
            
            
        )
    }
}

export default Button;