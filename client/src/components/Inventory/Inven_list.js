import '../Inventory/Inven.css';
import {Link} from "react-router-dom";
import React, {useState, useEffect, useRef } from "react";
export default function Invenlist(props) {
    console.log(props)
    return(
                <div class="inven-list">
                    
                    <div className="inven-list-body">
                        <Link to = {"inventory/product_detail/"+props.props._id.$oid} className="inven-card">
                            <img className="img-inven" src={'/images/bucket/'+props.props.img}/>
                            <div className="inven-info">
                                <div className="product-name">{props.props.item_name}</div>
                                <div className="product-price">{props.props.price}(฿) : </div>
                                <div className="product-onhand">Amount : {props.props.amount}</div>
                            </div>    
                        </Link>
                      
                        
                    </div>

                </div>


    );
}

