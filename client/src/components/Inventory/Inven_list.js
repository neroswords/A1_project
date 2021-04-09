import {Link} from "react-router-dom";
import React, {useState, useEffect, useRef } from "react";
import styled from 'styled-components';

const Styles = styled.div`
.inven-list {
    /* background-color: aqua; */
    width: auto;
    font-family: 'Public Sans', sans-serif;
}

.inven-list button{
    padding: 7px 15px;
    margin-bottom: 5%;
    font-size: 12px;
    border-radius: 25px;
    border: 1px solid #0078ff;
    transition: 0.5s;
    /* font-size: 12px;
    margin-bottom: 1%;
    background-color: rgb(29, 151, 29);
    color: white;
    padding: 5px 15px;
    border-radius: 0.5rem;
    border-style :none; */
    /* font-size: 17px;
    margin-bottom: 1%;
    background-color: rgb(29, 151, 29);
    color: white;
    font-weight: bold;
    padding: 5px 15px;
    border-radius: 0.5rem;
    border-style :none; */
}

.inven-list-body{
    max-width: 100%;
    text-decoration: none;
    /* margin: 0 auto; */
    display: grid;
    /* grid-gap: 3px; */
}

.inven-list-body .inven-card{
    text-decoration: none;
    color: black;
}



.inven-card {
    background-color: white;
    height: 100px;
    /* width: 300px; */
    border: 1px solid #dbdbdb;
    /* box-shadow: 0px 4.5px 14px rgba(0, 0, 0, 0.1); */
    display: grid;
    grid-template-columns: 40% 60%;
    margin: 3%;
}

.inven-list img {
    height: 80px;
    width: 80px;
    margin: 8%;
    /* box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.06); */
}

.inven-info{
    margin-top: 7%;
    font-size: 13px;
    margin-left: 1%;
}

.inven-info .product-name{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 5%;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.inven-info .product-price{
    max-width: 150px;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.inven-info .product-onhand{
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.inven-card img{
    border: 1px solid #dbdbdb;
      /* color: #dbdbdb; */
    /* background-color: #dbdbdb; */
} 
` 
export default function Invenlist(props) {
    console.log(props.props._id.$oid)
    return(    
        <Styles>
                <div class="inven-list">
                    
                    <div className="inven-list-body">
                        <Link to = {"inventory/product_detail/"+props.props._id.$oid} className="inven-card">
                            <img className="img-inven" src={'/images/bucket/'+props.props.img[0]}/>
                            <div className="inven-info">
                                <div className="product-name">{props.props.item_name}</div>
                                <div className="product-price">Price(฿) : {props.props.price}</div>
                                <div className="product-onhand">Amount : {props.props.amount}</div>
                            </div>    
                        </Link>  
                    </div>
                </div>
        </Styles>

    );
}

