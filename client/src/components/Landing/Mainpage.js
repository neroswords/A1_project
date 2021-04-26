import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';

// import Telephone from './images/Telephone.png';

const Styles = styled.div`

  /* .home .container {
    background-size: 100%;
    background-color: white;
    margin-bottom: 10%;
    position: relative;
    overflow: hidden;
    
} */
  .home > .row {
    --bs-gutter-x: 0 !important;
  }
  #main-page {
    background-color: white;
    margin: 20% ;
    /* margin-left: -100px; */
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr; */
  }
  
  #main-page .main-textt {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.25;
  } 

  .main-textt h1 {
    font-size: 60px;
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    color: #14213d;
    margin-top: 30%;
    margin-left: 20%;
  }

  .main-textt p {
    font-size: 20px;
    color: #14213d;
    line-height: 1.7;
    width: 30rem;
    margin-left: 20%;
    /* margin-top: 15%; */
  }

  .img-main-phone img {
    width: 70%;
    position: absolute;
    right: 0;
    /* margin-left: 45%; */
    /* margin-top: 3%; */
  }

  .img-bg-yellow{
    width: 90%;  
    top: 0px;
    position: absolute;
    z-index: -1;
    padding: 0 !important;
    margin: 0 !important;
    right: 0px !important;
  }

  @media only screen and (max-width: 400px){
    .main-textt h1 {
      font-size: 40px;
      font-family: 'Roboto', sans-serif;
      text-transform: uppercase;
      color: #14213d;
      margin-top: 25%;
      margin-left: 20%;
    }

  .main-textt p {
      font-size: 14px;
      color: #14213d;
      line-height: 1.7;
      width: 15rem;
      margin-left: 20%;
      /* margin-top: 15%; */
    }
    .img-bg-yellow{
      width: 100%;  
      /* top: 0px;
      position: absolute;
      z-index: -1;
      padding: 0 !important;
      margin: 0 !important;
      right: 0px !important; */
    }
  }

  @media only screen and (min-width: 1400px){
    .main-textt h1 {
      font-size: 60px;
      font-family: 'Roboto', sans-serif;
      text-transform: uppercase;
      color: #14213d;
      margin-top: 25%;
      margin-left: 20%;
    }

  .main-textt p {
      font-size: 20px;
      color: #14213d;
      line-height: 1.7;
      width: 30rem;
      margin-left: 20%;
      /* margin-top: 15%; */
    }
  }

  @media only screen and (min-width: 1900px){
    .main-textt h1 {
      font-size: 80px;
      font-family: 'Roboto', sans-serif;
      text-transform: uppercase;
      color: #14213d;
      margin-top: 25%;
      margin-left: 20%;
    }

  .main-textt p {
      font-size: 25px;
      color: #14213d;
      line-height: 1.7;
      width: 40rem;
      margin-left: 20%;
      /* margin-top: 15%; */
    }
  }
`


export const Mainpage = () => (
  <Styles>
    <div className="home">
    <div className="row">
        <img className="img-bg-yellow" src="./images/page.png"/>
        <div className="main-textt col-5">
                  <h1>A1 Chatbot</h1>
                  <p>A1 chatbot is a web-application that can help manage online purchasing and selling. It also includes automated reply message, order management, and online shop system administration via bot which you can create by your own. </p>
        </div>
        <div className="img-main-phone col-7">
                <img className="img-phone" src="./images/tel.png" />
        </div>
    </div>
   </div> 
  </Styles>
) 



{/* <Container fluid className="jumbo d-flex position-relative" >
        <img src="./images/Telephone.png" class="img-fluid" width="50%"/> 
        <h1>Welcome</h1>
        <span>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</span>      
        </Container> */}