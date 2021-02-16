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
    color: #14213d;
  }

  .main-text p {
    font-size: 18px;
    color: #14213d;
    line-height: 1.7;
    width: 21rem;
    margin-top: 15%;
  }

  .img-main .img-phone {
    width: 40%;
    position: absolute;
    margin-left: 45%;
    margin-top: 3%;
  }

   .img-bg {
    top: 0px;
    position: absolute;
    z-index: -1;
    right:0px;
  }
`;


export const Mainpage = () => (
  <Styles>
     
            
        
    <div className="home" >
    
    <div className="img-main" >
            <img className="img-phone" src="./images/tel.png" width="40%" />

          </div>
          <img className="img-bg" src="./images/page.png" width="100%" />
    <Container className="container">
    <Jumbo fluid className="jumbo d-flex position-relative">
        <section id="main-page">
        
          <div className="main-text">
            <h1>A1 Chatbot</h1>
            <p>A1 chatbot is a web-application that can help manage online purchasing and selling. It also includes automated reply message, order management, and online shop system administration via bot which you can create by your own. </p>
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