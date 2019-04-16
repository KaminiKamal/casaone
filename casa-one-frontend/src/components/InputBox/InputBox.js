import React, { Component } from 'react';
import _ from 'lodash';
import {isMobile} from '../../modules/utils.js';
class InputBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            textValue: this.props.value,
            markRequired: (<label style={{position:"relative", top: (this.props.titlePojo==="PRODUCT_DETAILS" ? "-61px" : (isMobile() ? "-56px" : "-10px")), color: "#E22322", fontSize: "12px"}}>*</label>),
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
handleChange(e){
    this.setState({textValue: e.target.value})
}
callBackFunction(e){
    //this.setState({textValue: e.target.value});
    // if(!e.target.value || e.target.value===""){//-56, -10
    //    // alert('Mandatory field')
    //    this.setState({markRequired: (<label style={{position:"relative", top:(this.props.titlePojo==="PRODUCT_DETAILS" ? "-61px" : (isMobile() ? "-56px" : "-10px")), color: "#E22322", fontSize: "12px"}}>*mandatory</label>)})
    //    return;
    // }
    this.setState({markRequired: (<label style={{position:"relative", top: (this.props.titlePojo==="PRODUCT_DETAILS" ? "-61px" : (isMobile() ? "-56px" : "-10px")), color: "#E22322", fontSize: "12px"}}>*</label>)});
    this.props.checkProperty(this.state.textValue, this.props.index, this.props.titlePojo, this.props.searchPojo, this.props.parent_index)
}
//checkProperty(textvalue, index, type, sub_type){//value, index of the lowest level, type, searchPojo
    
    render(){
        console.log("textValue", this.state.textValue)
        return(
            
            (
                this.props.type==="disabled-text"
                ?
                <div style={(this.props.titlePojo==="PRODUCT_DETAILS" ? {width: 'min-content'} : null)}>
                    <input  
                        required={true}
                        type="text"
                        style={{backgroundColor: '#ccc'}}
                        readOnly={true}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        
                    />
                    
                </div>
                :
                <div style={(this.props.titlePojo==="PRODUCT_DETAILS" ? {width: 'min-content'} : null)}>
                    {(
                        this.props.type==="date"
                        ?
                        <label style={{display: 'block', fontSize: '14px'}}>
                            {this.props.placeholder}
                        </label>
                        :
                        null

                    )}
                    <input  
                        required={true}
                        type={this.props.type} 
                        className={this.props.className} 
                        style={this.state.style}
                        placeholder={this.props.placeholder}
                        value={this.state.textValue}
                        onChange={this.handleChange.bind(this)} 
                        //onChange={this.callBackFunction.bind(this)}
                        onBlur={this.callBackFunction.bind(this)} 
                    />
                    {this.state.markRequired}
                </div>
            )
        )
    }
}

export default InputBox;