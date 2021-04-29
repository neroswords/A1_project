import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {isLoggedIn} from '../auth'

// import Telephone from './images/Telephone.png';

const Styles = styled.div`
  .all-endpage{
    padding: 1% 10% 10% 10% ;
    /* align-items: center; */
    margin-bottom: 50px;
  }

  #end-page {
    /* display: grid;
    grid-template-columns: 2fr 2fr; */
  }
  
.main-text-endpage {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.25;
  }

  .main-text-endpage h1 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 5%;
    margin-top: 16%;
    /* margin-left: 90px; */
    font-family: 'Roboto',sans-serif;
    color: #14213D;
  }

  .main-text-endpage span {
    text-align: center;
    /* margin-left: 90px; */
    font-size: 25px;
    color: #14213D;
    margin-bottom: 15%;
    max-width: 60px;
  }

  .btn-on-endpage button {
    color: white;
    font-weight: bold;
    padding: 15px 90px;
    border-radius: 30px;
    background-color: #14213d;
    border-style: none;
    margin: 5%;
  }

  .btn-on-endpage button:hover {
    color: white;
    font-weight: bold;
    padding: 15px 90px;
    border-radius: 30px;
    background-color: #fca311;
    // border: 2px solid #fca311;
  }
   
  .img-on-endpage img{
    width: 70%;
    position : absolute;
    right: 110px;
  }

  @media only screen and (max-width: 1200px){
  .img-on-endpage img {
    display: none;
  }
}

@media only screen and (max-width: 560px){
  .main-text-endpage {
    /* text-align: center; */
  }
}

`;

function regisBot(props){
  if(isLoggedIn()){
    return(
      <Link to={'/bot_list/'+localStorage.getItem('user_id')}>
        <button name="user-manage-bot">Manage Bot</button>
      </Link>
    )
  }
  else{
    return(
      <Link to = "/register">
          <button class="btn btn-primary" type="button">Register for FREE! </button>
      </Link>
    )
  }  
} 

export const Endpage = () => (
  <Styles>
    <div className="all-endpage">
        <div className="row">
              <div className="img-on-endpage col-lg-7 col-sm-12 col-md-12 col-lg-12 col-xl-7 .d-print-none">
                  <img src="./images/phone_group.png"/>
            </div>
            <div className="main-text-endpage col-5 col-sm-12 col-xs-12 col-xl-5">
                  <h1>Improve at every stage <br/> of your business growth</h1>
                  <span>No matter whether you’re a growing company ChatBot helps you communicate better with customers.</span>
                  <div class="btn-on-endpage">
                          {regisBot()}
                  </div>
              </div>
        {/* <img className="img-bg-yellow-end" src="./images/page.png" width="50%"/> */}
      </div>
    </div>
  </Styles>
) 
