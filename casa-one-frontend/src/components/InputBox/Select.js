import React, { Component } from 'react';
import _ from 'lodash';
import {isMobile} from '../../modules/utils.js';
class Select extends Component{
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
    this.setState({textValue: e.target.value})
    this.setState({markRequired: (<label style={{position:"relative", top: (this.props.titlePojo==="PRODUCT_DETAILS" ? "-61px" : (isMobile() ? "-56px" : "-10px")), color: "#E22322", fontSize: "12px"}}>*</label>)});
    this.props.checkProperty(e.target.value, this.props.index, this.props.titlePojo, this.props.searchPojo, this.props.parent_index)
}
   
    render(){
        return(
            
            (
                
                <div style={(this.props.titlePojo==="PRODUCT_DETAILS" ? {width: 'min-content'} : null)}>
                    
                    <select  
                        style={{width: '190px'}}
                        required={true}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        //value={this.state.textValue}
                        onChange={this.callBackFunction.bind(this)} 
                    >
                    <option>--Select--</option>
                    {
                        _.map(this.props.projectIds, (_el, _ind) => (
                            <option value={_el}>{_el}</option>
                        ))
                    }
                    </select>
                    {this.state.markRequired}
                </div>
            )
        )
    }
}

export default Select;