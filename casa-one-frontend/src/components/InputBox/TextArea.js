import React, { Component } from 'react';
import _ from 'lodash';

class TextArea extends Component{
    constructor(props){
        super(props);
        this.state = {
            textValue: null,
        }
    }

callBackFunction(){
    this.props.checkProperty(this.state.textValue, this.props.index, this.props.titlePojo, this.props.searchPojo)
}
//checkProperty(textvalue, index, type, sub_type){//value, index of the lowest level, type, searchPojo
    
    render(){
        return(
            
            <textarea 
                type={this.props.type} 
                className={this.props.className} 
                placeholder={this.props.placeholder}
                onChange={(e) => this.setState({textValue: e.target.value})} 
                onBlur={this.callBackFunction.bind(this)} 
            />
            
        )
    }
}

export default TextArea;