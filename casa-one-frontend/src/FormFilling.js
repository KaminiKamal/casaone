import React, { Component } from 'react';
import _ from 'lodash';
import styles from './App.scss';
import InputBox from './components/InputBox/InputBox.js';
import Button from './components/InputBox/Button.js';
import TextArea from './components/InputBox/TextArea.js';
import {isMobile} from './modules/utils';

class FormFilling extends Component {
    constructor(props){
        super(props);
        this.state = {
            virtualDomElements: [
                {
                    title: "Billing Address",
                    title_pojo: "BILLING_ADDRESS",
                    virtualObjects: [
                        {
                            type: "text",
                            className: "text-box",
                            searchPojo: "TEXT_DATA", //mongoose objectId
                            entities: [
                                {
                                    name: "First Name",
                                    value: ""
                                }, 
                                {
                                    name: "Last Name",
                                    value: ""
                                },
                                {
                                    name: "Address Line 1",
                                    value: ""
                                },
                                {
                                    name: "Address Line 2",
                                    value: ""
                                },
                                {
                                    name: "City",
                                    value: ""
                                },
                                {
                                    name: "State",
                                    value: ""
                                },
                                {
                                    name: "Zipcode",
                                    value: ""
                                },
                                {
                                    name: "Country",
                                    value: ""
                                }
                            ],
                            
                        },
                        {
                            type: "date",
                            className: "text-box",
                            searchPojo: "TEXT_DATA",
                            entities: [
                                {
                                   name: "Order Date",
                                   value: ""
                                } 
                            ],
                           
                        }
                    ]
                },
                {
                    title: "Shipping Address",
                    title_pojo: "SHIPPING_ADDRESS",
                    virtualObjects: [
                        {
                            type: "text",
                            className: "date-box",
                            searchPojo: "TEXT_DATA123", //mongoose objectId
                            entities: [
                                {
                                    name: "First Name",
                                    value: ""
                                }, 
                                {
                                    name: "Last Name",
                                    value: ""
                                },
                                {
                                    name: "Address Line 1",
                                    value: ""
                                },
                                {
                                    name: "Address Line 2",
                                    value: ""
                                },
                                {
                                    name: "City",
                                    value: ""
                                },
                                {
                                    name: "State",
                                    value: ""
                                },
                                {
                                    name: "Zipcode",
                                    value: ""
                                },
                                {
                                    name: "Country",
                                    value: ""
                                }
                            ],
                           
                        },
                        {
                            type: "date",
                            className: "text-box",
                            searchPojo: "TEXT_DATA123",
                            entities: [
                                {
                                    name : "Expected Delivery",
                                    value: ""
                                }
                            ],
                            
                        }
                    ]
                },
            ],
            productDetails: [
                {
                    title: "Product Details",
                    title_pojo: "PRODUCT_DETAILS",
                    virtualList: [
                        {
                            
                            className: "text-box",
                            searchPojo: "TEXT_DATA345", //mongoose objectId
                            entities: [
                                {
                                    placeholder: "Product ID",
                                    type: "text",
                                    className: "product-id",
                                    value: null
                                },
                                {
                                    placeholder: "Product Name",
                                    type: "text",
                                    className: "product-name",
                                    value: null
                                },
                                {
                                    placeholder: "QTY",
                                    type: "number",
                                    className: "product-qty",
                                    value: null
                                },
                                {
                                    placeholder: "Unit Price",
                                    type: "number",
                                    className: "product-unit-price",
                                    value: null
                                },
                                {
                                    placeholder: "Total Price",
                                    type: "text",
                                    className: "product-total-price",
                                    value: null
                                },
                                {
                                    placeholder: "Notes",
                                    type: "textarea",
                                    className: "product-notes",
                                    value: null
                                },
                            ],
                            
                        },
                        
                    ]
                }
                // {
                //     title_pojo: "productDetails",
                //     index: [
                //         {
                //             placeholder: "Product ID",
                //             type: "text",
                //             className: "product-id",
                //             value: null
                //         },
                //         {
                //             placeholder: "Product Name",
                //             type: "text",
                //             className: "product-id",
                //             value: null
                //         },
                //         {
                //             placeholder: "QTY",
                //             type: "number",
                //             className: "product-id",
                //             value: null
                //         },
                //         {
                //             placeholder: "Unit Price",
                //             type: "number",
                //             className: "product-id",
                //             value: null
                //         },
                //         {
                //             placeholder: "Total Price",
                //             type: "text",
                //             className: "product-id",
                //             value: null
                //         },
                        
                //     ]
                // },
            ]
        }
    }
    componentDidMount(){

    }
    SaveProductDetails(){
        console.log("Product Details", this.state)
    }
    checkProperty(textvalue, index, type, sub_type){//value, index of the lowest level, type, searchPojo
        switch(type){
            case "PRODUCT_DETAILS": 
                var _index = _.findIndex(this.state.productDetails, (el, ind) => el.title_pojo===type);
                var __index = _.findIndex(this.state.productDetails[_index].virtualList, (el, ind) => (el.searchPojo===sub_type));
                this.state.productDetails[_index].virtualList[__index].entities[index].value = textvalue;
                //_.findIndex(users, function(o) { return o.user == 'barney'; });
                this.setState({productDetails: this.state.productDetails})
                console.log("productDetails::", this.state.productDetails)
                return;
                

            case "BILLING_ADDRESS":
                var _index = _.findIndex(this.state.virtualDomElements, (el, ind) => el.title_pojo===type);
                var __index = _.findIndex(this.state.virtualDomElements[_index].virtualObjects, (el, ind) => (el.searchPojo===sub_type));
                this.state.virtualDomElements[_index].virtualObjects[__index].entities[index].value = textvalue;
                //_.findIndex(users, function(o) { return o.user == 'barney'; });
                this.setState({virtualDomElements: this.state.virtualDomElements})
                //console.log("virtualDomElements::", this.state.virtualDomElements)
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
    clickToDelete(){

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
                            type: "text",
                            className: "product-id",
                            value: null
                        },
                        {
                            placeholder: "Product Name",
                            type: "text",
                            className: "product-name",
                            value: null
                        },
                        {
                            placeholder: "QTY",
                            type: "number",
                            className: "product-qty",
                            value: null
                        },
                        {
                            placeholder: "Unit Price",
                            type: "number",
                            className: "product-unit-price",
                            value: null
                        },
                        {
                            placeholder: "Total Price",
                            type: "text",
                            className: "product-total-price",
                            value: null
                        },
                        {
                            placeholder: "Notes",
                            type: "textarea",
                            className: "product-notes",
                            value: null
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
                                                        <div key={e_index+`inner_box`}>
                                                            {
                                                                _.map(e_child.entities, (e_element, e_index) => {
                                                                    return(
                                                                        <InputBox 
                                                                            className={e_child.className}
                                                                            key={e_index}
                                                                            index={e_index}
                                                                            type={e_child.type}
                                                                            searchPojo={e_child.searchPojo}
                                                                            checkProperty={this.checkProperty.bind(this)}
                                                                            placeholder={e_element.name}
                                                                            titlePojo={_el.title_pojo}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                        </div>
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
                                    <td style={{width: "120px"}}>PRODUCT ID</td>
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
                                                                    _.map(e_child.entities, (e_element, e_index) => {
                                                                        if(e_element.type==="textarea"){
                                                                            return(
                                                                                <TextArea 
                                                                                    className={e_element.className}
                                                                                    key={e_index}
                                                                                    index={e_index}
                                                                                    type={e_element.type}
                                                                                    searchPojo={e_child.searchPojo}
                                                                                    checkProperty={this.checkProperty.bind(this)}
                                                                                    placeholder={e_element.name}
                                                                                    titlePojo={e_element.title_pojo}
                                                                                />
                                                                            )
                                                                        }
                                                                        if(e_element.type!=="textarea"){
                                                                            return(
                                                                                <div style={{display: 'flex'}} className="table-elements">
                                                                                    <InputBox 
                                                                                        className={e_element.className}
                                                                                        key={e_index}
                                                                                        index={e_index}
                                                                                        type={e_element.type}
                                                                                        searchPojo={e_child.searchPojo}
                                                                                        checkProperty={this.checkProperty.bind(this)}
                                                                                        placeholder={e_element.name}
                                                                                        titlePojo={e_element.title_pojo}
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
                                                                type="button"
                                                                functionToCall={this.clickToDelete.bind(this)}
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
                                                                    _.map(e_child.entities, (e_element, e_index) => {
                                                                        
                                                                        if(e_element.type!=="textarea"){
                                                                            return(
                                                                                <InputBox 
                                                                                    // className={e_element.className}
                                                                                    key={e_index}
                                                                                    index={e_index}
                                                                                    type={e_element.type}
                                                                                    searchPojo={e_child.searchPojo}
                                                                                    checkProperty={this.checkProperty.bind(this)}
                                                                                    placeholder={e_element.placeholder}
                                                                                    titlePojo={e_element.title_pojo}
                                                                                />
                                                                            )
                                                                        }
                                                                        
                                                                        if(e_element.type==="textarea"){
                                                                            return(
                                                                                <TextArea 
                                                                                    className={e_element.className}
                                                                                    key={e_index}
                                                                                    index={e_index}
                                                                                    type={e_element.type}
                                                                                    searchPojo={e_child.searchPojo}
                                                                                    checkProperty={this.checkProperty.bind(this)}
                                                                                    placeholder={e_element.name}
                                                                                    titlePojo={_el.title_pojo}
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
                                                        type="button"
                                                        functionToCall={this.clickToDelete.bind(this)}
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
                    showButton={true}
                />
                    
                
                
                <div className="btn-float-rgt" style={{marginTop:'2.5em'}}>
                    <Button 
                        className="submit"
                        type="button"
                        functionToCall={this.SaveProductDetails.bind(this)}
                        placeholder="Save"
                        showButton={true}
                    />
                </div>
            </div>
        
                
        </div>
       );
    }
}

export default FormFilling;
