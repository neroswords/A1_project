import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {isLoggedIn} from '../auth'

// import Telephone from './images/Telephone.png';

const Styles = styled.div`
  .jumbo {
    align-items: center;
  }

  .container {
    // background: url(${process.env.PUBLIC_URL +'/images/Background.png'}) no-repeat fixed bottom;
    background-size: 100%;
    margin-bottom: 10%;
}

  #main {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  #main .main-text {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.25;
    
  }

  h1 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 5%;
    font-family: 'Roboto', sans-serif;

  }

  span {
    font-size: 20px;
    color: grey;
    margin-bottom: 15%;
  }

`;

function regisBot(){
  if(isLoggedIn()){
    return <h1>You already have account</h1>
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
    <Container className="container">
    <Jumbo fluid className="jumbo d-flex position-relative">
        <section id="main">
          <img src="./images/phone_group.png" width="90%"/>
          <div className="main-text">
            <h1>Improve at every stage <br/> of your business growth</h1>
            <span>No matter whether you’re a growing company <br/> ChatBot helps you communicate better with customers.</span>
            <div class="d-grid gap-2 col-6 mx-auto mt-5">
              {/* <Link to = "/register">
                <button class="btn btn-primary" type="button">Register for FREE! </button>
              </Link> */}
              {regisBot()}
            </div>
          </div>
          
        </section>
    </Jumbo>
    </Container>
  </Styles>
) 
