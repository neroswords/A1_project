import React from 'react';
import '../Inventory/Inven.css';
import {Link} from "react-router-dom";

export default function Invenlist() {

    return(
                <div class="inven-list">
                    <hr></hr>
                    <button className="create-invenbtn btn-success" type="button">Create</button>
                    <div className="inven-list-body">
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        <Link className="inven-card">
                            <img className="img-inven" src={'/images/add-inven.png'}/>
                            <div className="inven-info">
                                <div className="product-name">ProductName</div>
                                <div className="product-price">Price(฿) : </div>
                                <div className="product-onhand">On hand : </div>
                            </div>    
                        </Link>
                        
                    </div>

                </div>


    );
}
