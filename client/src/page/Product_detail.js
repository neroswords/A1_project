import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Styles = styled.div` 
  .container {
    font-family: 'Public Sans', sans-serif;
    margin-top: 2%;
  }
  .card-pd{
    padding: 20px;
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  
  .card-pd .card-pd-body {
    margin: 1rem;
}

.btn-top-pd{
    margin-bottom: 6%;
}

.btn-top-pd .back-pd{
    float:left;
    font-size: 20px;
    cursor: pointer;
}

.link-back-pd{
    color: black;
}

.pd-edit i {
    float:right;
    font-size: 20px;
    border: 5px solid white;
    border: 50%;
    cursor: pointer;
    padding: 4px;
    margin-bottom: 50px;
}

.edit-pd:hover{
    border: 5px solid #ddd;
    border-radius : 50%;
    background-color: #ddd;
    padding: 2px;
}
.btn-top-pd h3{
    float:right;
    font-weight: bold;
}

.pd-detail .pd-name{
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
    margin-top: 10%;
    margin-bottom: 4%;
}

.pd-detail .pd-price{
    font-size: 20px;
    text-transform:uppercase;
    font-weight: 600;
    margin-bottom: 3%;
}

.pd-detail .pd-type{
    margin-bottom: 3%;
    font-size: 15px;
    background-color: black;
    color:white;
}

.pd-detail .pd-amount{
    font-size: 15px;
    text-transform:uppercase;
    font-weight: 600;
    color: #00c462;
    margin-bottom: 3%;
}

.pd-des{
    font-size: 15px;
    margin-top: 5%;
    margin-bottom: 3%;
}
.card__footer{
    padding: 30px 40px;
    display: flex;
    flex-flow: row no-wrap;
    align-items: center;
    position: relative;
}

.line-pd{
    margin-top: 5%;
    width: 100%;
    height: 3px;
    background: #115dd8;
    background: linear-gradient(to right, #115dd8 0%,#115dd8 20%,#ddd 20%,#ddd 100%);
}

.card__footer .recommend-pd{
    float:left;
    margin: 0;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    color: #555;
}

.card__footer button{
    cursor: pointer;
    border: 1px solid #115dd8;
    padding: 14px 30px;
    border-radius: 200px;
    color: #fff;
    background: #115dd8;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    transition: 200ms;
}

.img-pd {
    margin-right: 5%;
    /* border: 2px solid black; */
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
    /* grid-template-rows: 90px 90px; */
}

.img-pd img {
    width: 150px;
    height: 150px;
}

`
function Product_datail(botID){
    return(
        <Styles>
                <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-8 mx-auto">
                    <div className="card card-pd">
                        <div className="card-pd-body">
                            <div className="btn-top-pd">
                                <Link to={"/bot/"+ botID +"/inventory"} className="link-back-pd" > 
                                    <i className="back-pd fas fa-arrow-left"></i>
                                </Link>
                                <h3>Product Details</h3>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col previmg-pd">
                                    <div className="img-pd">
                                        <img className="img-inven" src={'/images/add-inven.png'}/>
                                        <img className="img-inven" src={'/images/add-inven.png'}/>
                                        <img className="img-inven" src={'/images/add-inven.png'}/>
                                        <img className="img-inven" src={'/images/add-inven.png'}/>
                                    </div>
                                </div>
                                
                                <div className="col pd-detail">
                                    {/* <Link to={"/bot/"+ botID +"/inventory"} className="pd-edit"> 
                                        <i className="edit-pd fas fa-pencil-alt"></i>
                                    </Link> */}
                                    <div className="pd-name">ชื่อสินค้า</div>
                                    <div className="pd-price">฿ </div>
                                    <div className="pd-type">type</div>
                                    <div className="pd-amount">Amount: </div>
                                    <div className="pd-des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem nam pariatur voluptate perferendis, asperiores aspernatur! Porro similique consequatur, nobis soluta minima, quasi laboriosam hic cupiditate perferendis esse numquam magni.</div>
                                </div>
                            </div>
                            {/* <div className="line-pd"></div>
                            <div className="card__footer d-flex justify-content-between">
                                    <div className="recommend-pd">
                                        <p>Recommended by</p>
                                        <h3>Andrew Palmer</h3>
                                    </div>
                                <button className="edit-pd" type="button">Edit Product Product Datail</button>
                            </div> */}
                        </div>
                    </div>
                    </div>

                </div>
        </Styles>
    );
}

export default  Product_datail;