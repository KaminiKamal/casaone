import React, { Component } from 'react';
import _ from 'lodash';
import styles from './App.scss';
import InputBox from './components/InputBox/InputBox.js';
import Button from './components/InputBox/Button.js';
import Select from './components/InputBox/Select.js';
import TextArea from './components/InputBox/TextArea.js';
import {isMobile} from './modules/utils';
import {ADDRESS_AND_PRODUCT_DETAILS} from './constants.js';
import fetchData from './modules/NetworkAdapter';

class FormFilling extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader: (<div className="loader"></div>),
            virtualDomElements: [],
            productDetails: [],
            productids: [
                "5b87e2b9c2b7cb4829641da2", 
                "5b87e2b9c2b7cb4829641db5",
                "5b87e2b9c2b7cb4829641dc6",
                "5b87e2b9c2b7cb4829641db7",
                "5b87e2b9c2b7cb4829641dd8"
            ],
            productDescription: 
                {
                    "5b87e2b9c2b7cb4829641da2": {
                        name: "Dining Table",
                        price: "1000"
                    },
                    "5b87e2b9c2b7cb4829641db5": {
                        name: "Chair",
                        price: "500"
                    },
                    "5b87e2b9c2b7cb4829641dc6": {
                        name: "Sofa",
                        price: "1500"
                    },
                    "5b87e2b9c2b7cb4829641db7": {
                        name: "Mattress",
                        price: "500"
                    },
                    "5b87e2b9c2b7cb4829641dd8": {
                        name: "Computer Table",
                        price: "1500"
                    }

                },
                
            
        }
    }
    componentDidMount(){
        fetchData.getJson(ADDRESS_AND_PRODUCT_DETAILS)
        //.then(res => res.json())
        .then(res => {
            //console.log("response", res);
            const { virtualDomElements, productDetails} = res;
            this.setState({
                virtualDomElements: virtualDomElements, 
                productDetails: productDetails, 
                loader: false
            })
        })
    }
    SaveProductDetails(){
        console.log("Product Details", this.state)

    }
    checkProperty(textvalue, index, type, sub_type, parent_index){//value, index of the lowest level, type, searchPojo
        switch(type){
            case "PRODUCT_DETAILS": 
                var _index = _.findIndex(this.state.productDetails, (el, ind) => el.title_pojo===type);
                var __index = parent_index;
                
                this.state.productDetails[parent_index].virtualList[0].entities[index].value = textvalue;
                let calculation_of_assets = this.state.productDetails[parent_index].virtualList[0].entities;
                
                if(calculation_of_assets[2].value && calculation_of_assets[3].value){
                    this.state.productDetails[parent_index].virtualList[0].entities[4].value = (Number(calculation_of_assets[2].value) * Number(calculation_of_assets[3].value)).toString();
                }
                if(index===0){
                    // var item_details = this.state.productDescription[textvalue];
                    // console.log("item_details", item_details)
                    // this.state.productDetails[parent_index].virtualList[0].entities[3].value = item_details.price;
                    // this.state.productDetails[parent_index].virtualList[0].entities[1].value = item_details.name;
                    // this.state.productDetails[parent_index].virtualList[0].entities[4].value = (Number(calculation_of_assets[2].value) * Number(calculation_of_assets[3].value)).toString();
                
                }
                
                this.setState({productDetails: this.state.productDetails});
                console.log(this.state.productDetails)
                return;
                

            case "BILLING_ADDRESS":
                var _index = _.findIndex(this.state.virtualDomElements, (el, ind) => el.title_pojo===type);
                var __index = _.findIndex(this.state.virtualDomElements[_index].virtualObjects, (el, ind) => (el.searchPojo===sub_type));
                this.state.virtualDomElements[_index].virtualObjects[__index].entities[index].value = textvalue;
                this.setState({virtualDomElements: this.state.virtualDomElements})
                return;

            case "SHIPPING_ADDRESS":
                var _index = _.findIndex(this.state.virtualDomElements, (el, ind) => el.title_pojo===type);
                var __index = _.findIndex(this.state.virtualDomElements[_index].virtualObjects, (el, ind) => (el.searchPojo===sub_type));
                this.state.virtualDomElements[_index].virtualObjects[__index].entities[index].value = textvalue;
                this.setState({virtualDomElements: this.state.virtualDomElements})
                return;

            default:
                return;
                
        }
    }
    clickToDelete(_index, e){
        e.preventDefault();
        if(_index===0 && this.state.productDetails.length===1){
            alert('Atleast one product is required');
            return;
        }
        
        this.state.productDetails.splice(_index, 1);
        this.setState({productDetails: this.state.productDetails})
    }
    clickToAdd(data){
        let newProduct = {
            title: "Product Details",
            title_pojo: "PRODUCT_DETAILS",
            virtualList: [
                {
                    type: "text",
                    className: "text-box",
                    searchPojo: "TEXT_DATA"+this.state.productDetails.length, //mongoose objectId
                    entities: [
                        {
                            placeholder: "Product ID",
                            type: "select",
                            className: "product-id",
                            value: ""
                        },
                        {
                            placeholder: "Product Name",
                            type: "text",
                            className: "product-name",
                            value: ""
                        },
                        {
                            placeholder: "QTY",
                            type: "number",
                            className: "product-qty",
                            value: 0
                        },
                        {
                            placeholder: "Unit Price",
                            type: "text",
                            className: "product-unit-price",
                            value: ""
                        },
                        {
                            placeholder: "Total Price",
                            type: "disabled-text",
                            className: "product-total-price",
                            value: ""
                        },
                        {
                            placeholder: "Notes",
                            type: "textarea",
                            className: "product-notes",
                            value: ""
                        },
                    ],
                    
                },
                
            ]
        }
        let Modified_productDetails = this.state.productDetails;
        Modified_productDetails.push(newProduct);
        this.setState({
            productDetails: Modified_productDetails
        })
    }
    render() {
        return (
            
                (this.state.loader
                    ?
                this.state.loader
                    :
                    <div className="form-container">
                         <div className="container-box">
                       
                        {
                            _.map(this.state.virtualDomElements, (_el, _index) => 
                                
                                    (   
                                        <div key={_index+`outer_box`} className="virtualDom_ele">
                                            {_el.title}
                                            <div>
                                                {
                                                    _.map(_el.virtualObjects, (e_child, e_index) => {
                                                        return(
                                                            // <div key={e_index+`inner_box`}>
                                                                
                                                                    _.map(e_child.entities, (e_element, _e_index) => {
                                                                        return(
                                                                            <InputBox 
                                                                                className={e_child.className}
                                                                                key={_e_index}
                                                                                parent_index={e_index}
                                                                                index={_e_index}
                                                                                type={e_child.type}
                                                                                searchPojo={e_child.searchPojo}
                                                                                checkProperty={this.checkProperty.bind(this)}
                                                                                placeholder={e_element.name}
                                                                                titlePojo={_el.title_pojo}
                                                                                value={e_element.value}
                                                                            />
                                                                        )
                                                                    })
                                                                
                                                            // </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                
                            )
                        }
                        
                    </div>
                <div className="table-container">
                    {
                        (!isMobile()
                            ?
                        <div className="product-table">
                            <table style={{width: '100%',paddingLeft: '1em', height: '3em', borderBottom: '1px solid lightgray'}}>
                                <tbody>
                                    <tr>
                                        <td style={{width: "208px"}}>PRODUCT ID</td>
                                        <td style={{width: "175px"}}>PRODUCT NAME</td>
                                        <td style={{width: "100px"}} >QTY</td>
                                        <td style={{width: "120px"}} >UNIT PRICE</td>
                                        <td style={{width: "145px"}}>TOTAL PRICE</td>
                                        <td style={{width: "165px"}} >NOTES</td>
                                        <td>       </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    {
                                        _.map(this.state.productDetails, (_el, _index) => 
                                            
                                                (   
                                                    <tr key={_index+`outer_box`}>
                                                        
                                                        <td style={{display: 'flex', margin: '1em 0em 1em 0em'}}>
                                                            {
                                                                _.map(_el.virtualList, (e_child, e_index) => {
                                                                    return( 
                                                                        _.map(e_child.entities, (e_element, _e_index) => {
                                                                            if(e_element.type==="textarea"){
                                                                                return(
                                                                                    <TextArea 
                                                                                        className={e_element.className}
                                                                                        parent_index={e_index}
                                                                                        key={_e_index}
                                                                                        index={_e_index}
                                                                                        type={e_element.type}
                                                                                        searchPojo={e_child.searchPojo}
                                                                                        checkProperty={this.checkProperty.bind(this)}
                                                                                        placeholder={e_element.name}
                                                                                        titlePojo={_el.title_pojo}
                                                                                        value={e_element.value}
                                                                                    />
                                                                                )
                                                                            }
                                                                            if(e_element.type==="select"){
                                                                                return(
                                                                                    <div style={{display: 'flex'}} className="table-elements">
                                                                                        <Select 
                                                                                            className={e_element.className}
                                                                                            parent_index={e_index}
                                                                                            key={_e_index}
                                                                                            index={_e_index}
                                                                                            type={e_element.type}
                                                                                            searchPojo={e_child.searchPojo}
                                                                                            checkProperty={this.checkProperty.bind(this)}
                                                                                            placeholder={e_element.name}
                                                                                            titlePojo={_el.title_pojo}
                                                                                            value={e_element.value}
                                                                                            projectIds={this.state.productids}
                                                                                        />
                                                                                        
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            if(e_element.type==="text" || e_element.type==="number"){
                                                                                console.log("text--->", e_element.value)
                                                                                return(
                                                                                    <div style={{display: 'flex'}} className="table-elements">
                                                                                        <InputBox 
                                                                                            className={e_element.className}
                                                                                            parent_index={e_index}
                                                                                            key={_e_index}
                                                                                            index={_e_index}
                                                                                            type={e_element.type}
                                                                                            searchPojo={e_child.searchPojo}
                                                                                            checkProperty={this.checkProperty.bind(this)}
                                                                                            placeholder={e_element.name}
                                                                                            titlePojo={_el.title_pojo}
                                                                                            value={e_element.value}
                                                                                        />
                                                                                        
                                                                                    </div>
                                                                                    
                                                                                )
                                                                            }
                                                                            if(e_element.type==="disabled-text"){
                                                                                return(
                                                                                    <div style={{display: 'flex'}} className="table-elements">
                                                                                        <InputBox 
                                                                                            className={e_element.className}
                                                                                            parent_index={e_index}
                                                                                            key={_e_index}
                                                                                            index={_e_index}
                                                                                            type={e_element.type}
                                                                                            searchPojo={e_child.searchPojo}
                                                                                            checkProperty={this.checkProperty.bind(this)}
                                                                                            placeholder={e_element.name}
                                                                                            titlePojo={_el.title_pojo}
                                                                                            value={e_element.value}
                                                                                        />
                                                                                        
                                                                                    </div>
                                                                                    
                                                                                )
                                                                            }
                                                                            
                                                                        })
                                                                    )
                                                                })
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="btn-float-rgt">
                                                                <Button 
                                                                    className="danger"
                                                                    index={_index}
                                                                    type="button"
                                                                    functionToCall={this.clickToDelete.bind(this, _index)}
                                                                    placeholder="Delete"
                                                                    showButton={true}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            
                                        )
                                    }
                                </tbody>
                            </table>
                            
                        </div>
                            :
                        <div className="product-table">
                            <div>Product Details</div>
                            {
                            _.map(this.state.productDetails, (_el, _index) => 
                                
                                    (  
                                        <div style={{display: 'flex', marginTop: '-1px', width: 'fit-content'}}>  
                                            <div className="margin-strike-through">
                                                <div className="count-bead">
                                                    {_index+1}
                                                </div>
                                            </div>
                                            <div key={_index+`outer_box_responsive`} className="product-details">
                                                
                                                <div>
                                                    {
                                                        _.map(_el.virtualList, (e_child, e_index) => {
                                                            return(
                                                                <div key={e_index+`inner_box_responsive`}>
                                                                    {
                                                                        _.map(e_child.entities, (e_element, _e_index) => {
                                                                            if(e_element.type==="select"){
                                                                                return(
                                                                                    <div style={{display: 'flex'}} className="table-elements">
                                                                                        <Select 
                                                                                            className={e_element.className}
                                                                                            parent_index={e_index}
                                                                                            key={_e_index}
                                                                                            index={_e_index}
                                                                                            type={e_element.type}
                                                                                            searchPojo={e_child.searchPojo}
                                                                                            checkProperty={this.checkProperty.bind(this)}
                                                                                            placeholder={e_element.name}
                                                                                            titlePojo={_el.title_pojo}
                                                                                            value={e_element.value}
                                                                                            projectIds={this.state.productids}
                                                                                        />
                                                                                        
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            if(e_element.type==="text" || e_element.type==="number"){
                                                                                console.log("text-->", e_element.value)
                                                                                return(
                                                                                    <InputBox 
                                                                                        // className={e_element.className}
                                                                                        parent_index={_index}
                                                                                        key={_e_index}
                                                                                        index={_e_index}
                                                                                        type={e_element.type}
                                                                                        searchPojo={e_child.searchPojo}
                                                                                        checkProperty={this.checkProperty.bind(this)}
                                                                                        placeholder={e_element.placeholder}
                                                                                        titlePojo={_el.title_pojo}
                                                                                        value={e_element.value}
                                                                                    />
                                                                                )
                                                                            }
    
                                                                            if(e_element.type==="disabled-text"){
                                                                                return(
                                                                                    <div style={{display: 'flex'}} className="table-elements">
                                                                                        <InputBox 
                                                                                            parent_index={_index}
                                                                                            key={_e_index}
                                                                                            index={_e_index}
                                                                                            value={e_element.value}
                                                                                            type={e_element.type}
                                                                                            searchPojo={e_child.searchPojo}
                                                                                            checkProperty={this.checkProperty.bind(this)}
                                                                                            placeholder={e_element.name}
                                                                                            titlePojo={_el.title_pojo}
                                                                                            value={e_element.value}
                                                                                        />
                                                                                        
                                                                                    </div>
                                                                                    
                                                                                )
                                                                            }
                                                                            if(e_element.type==="textarea"){
                                                                                return(
                                                                                    <TextArea 
                                                                                        className={e_element.className}
                                                                                        key={_e_index}
                                                                                        index={_index}
                                                                                        parent_index={e_index}
                                                                                        type={e_element.type}
                                                                                        searchPojo={e_child.searchPojo}
                                                                                        checkProperty={this.checkProperty.bind(this)}
                                                                                        placeholder={e_element.name}
                                                                                        titlePojo={_el.title_pojo}
                                                                                        value={e_element.value}
                                                                                    />
                                                                                    
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div style={{marginTop: '2em'}}>
                                                        <Button 
                                                            className="danger"
                                                            index={_index}
                                                            type="button"
                                                            functionToCall={this.clickToDelete.bind(this, _index)}
                                                            placeholder="Delete"
                                                            showButton={true}
                                                        />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                
                                    )
                                )
                            }
                           
                            
                        </div>
                        )
                    }
                    
                    
                    <Button 
                        className="submit"
                        type="button"
                        functionToCall={this.clickToAdd.bind(this)}
                        placeholder="Add Product"
                        index={null}
                        showButton={true}
                    />
                        
                    
                    
                    <div className="btn-float-rgt" style={isMobile() ? {marginTop:'0', float: 'left'} : {marginTop:'2.5em'}}>
                        <Button 
                            className="submit"
                            type="submit"
                            functionToCall={this.SaveProductDetails.bind(this)}
                            placeholder="Save"
                            showButton={true}
                            index={null}
                        />
                    </div>
                </div>
            
                    
            </div>
           
                )
            
            
       );
    }
}

export default FormFilling;
