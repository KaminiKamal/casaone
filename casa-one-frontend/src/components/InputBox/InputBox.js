import React, { Component } from 'react';
import _ from 'lodash';

class InputBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            textValue: null,
            style:{
                
            }
        }
    }
    componentDidMount(){
        switch(this.props.className){
            case "width-0":
                this.setState({style: {
                    width: '60%'
                }})
                return;

            case "width-10":
                this.setState({style: {
                    // width: '10%'
                }})
                return;
            
            case "width-20":
                this.setState({style: {
                    width: '20%'
                }})
                return;
        }
    }

callBackFunction(){
    this.props.checkProperty(this.state.textValue, this.props.index, this.props.titlePojo, this.props.searchPojo)
}
//checkProperty(textvalue, index, type, sub_type){//value, index of the lowest level, type, searchPojo
    
    render(){
        return(
            
            <input 
                type={this.props.type} 
                className={this.props.className} 
                style={this.state.style}
                placeholder={this.props.placeholder}
                onChange={(e) => this.setState({textValue: e.target.value})} 
                onBlur={this.callBackFunction.bind(this)} 
            />
        
        )
    }
}

export default InputBox;