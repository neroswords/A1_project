import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
// import Telephone from './images/Telephone.png';

const Styles = styled.div`
  .home .jumbo {
    align-items: center;
    font-family: 'Public Sans', sans-serif;
    
  }

  .home .container {
    // background: url(${process.env.PUBLIC_URL +'/images/Background.png'}) no-repeat fixed bottom;
    background-size: 100%;
    margin-bottom: 15%;
    position: relative;
}

  #main-page {
    margin-top: 150px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  #main-page .main-text {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.25;
  }

  h1 {
    font-size: 80px;
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
  }

  span {
    color: grey;
  }
`;


export const Mainpage = () => (
  <Styles>
    <div className="home" >
    <Container className="container">
    <Jumbo fluid className="jumbo d-flex position-relative">
        <section id="main-page">
          <div className="main-text">
            <h1>A1 Chatbot</h1>
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />Inventore deleniti aliquid  et consectetur corporis eum odit.<br /> Excepturi, repellendus.</span>
          </div>
          <div className="img-main">
            <img src="./images/Telephone.png" width="110%"/>
          </div>
        </section>
    </Jumbo>
    </Container>
    </div>
  </Styles>
) 



{/* <Container fluid className="jumbo d-flex position-relative" >
        <img src="./images/Telephone.png" class="img-fluid" width="50%"/> 
        <h1>Welcome</h1>
        <span>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</span>      
        </Container> */}