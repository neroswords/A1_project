import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div`
.inven-list {
    /* background-color: aqua; */
    width: auto;
    font-family: 'Public Sans', sans-serif;
}

.inven-list button{
    font-size: 17px;
    margin-bottom: 1%;
    background-color: rgb(29, 151, 29);
    color: white;
    /* font-weight: bold; */
    padding: 5px 15px;
    border-radius: 1rem;
    border-style :none;
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

@media (min-width: 600px) {
    .inven-list-body { 
        grid-template-columns: repeat(2, 1fr); 
        }
}

@media (min-width: 920px) {
    .inven-list-body { 
        grid-template-columns: repeat(3, 1fr); 
        }
}

  @media (min-width: 1200px) {
    .inven-list-body { 
        grid-template-columns: repeat(4, 1fr); 
    }
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
    filter: grayscale(1);
    /* color: #dbdbdb; */
    /* background-color: #dbdbdb; */
} 
`

export default function Invenlist(botID) {

    return(
        <Styles>
                <div class="inven-list">
                    <hr></hr>
                    <Link  botID = {botID} to={"/bot/"+ botID +"/add_item"}>                   
                        <button className="create-invenbtn btn-success" type="button">Create</button>
                    </Link>
                    <div className="inven-list-body">
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">Amount : </div>
                            </div>    
                        </Link>
                    </div>
                </div>
        </Styles>
    );
}
