import React from 'react';
import styled from 'styled-components';
import { Container, Jumbotron as Jumbo } from 'react-bootstrap';
// import PhoneG from './image/phone_group.png';


const Styles = styled.div`
.jumbo {
    align-items: center;
    margin: 5% 0;
}

.container {
    // background: url(${process.env.PUBLIC_URL +'/images/bg-home.png'}) no-repeat fixed bottom;
    background-size: 100%;
    margin-bottom: 20%;
}

.line {
    height: 2px;
    background-color: #D3D3D3;
    width: 400px;
    align-items: right;
    margin-top: 1%;
    margin-bottom: 1%;
}

.card {
  width: 20rem;
  height: 35rem;
  margin-bottom: 5%;
  border-radius: 10px;
  border: 0 solid #fca311;
  background: #fff;
  padding: 3%;
  box-shadow: 0 9px 15px rgba(0,0,0,.08), 0 9px 10px rgba(0,0,0,.05);
  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
//   cursor: pointer;
}

// .card:hover{
//   transform: scale(1.05);
//   box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
// }

h1 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 40px;
    font-family: 'Roboto', sans-serif;
  }

.card h5 {
    margin-top: 2%;
    font-weight: bold;

}

.card p {
    color: black;
}

ul { 	
    list-style: none; 	 	
    font-size: 18px; 	
    letter-spacing: 0.5px;
    display: inline;
    // padding: none;
    // line-height: 50px; 
} 

li i {
    margin-left: -30px;
    color: #5BB30A;
    margin-right: 5%;
    display: inline;
    margin-bottom: 5px;
} 

li p {
    display: inline;
}

.select {
    margin-button: 15px;
}

.img-card img {
    width: 80%;
    text-align: center;
    align-item: center;
    // background-color: black;
    margin-bottom:10%;
}

.img-card {
    margin-left: 20%;
}


`;

export const CardList = () => (
    <Styles >
        <Container className="container"> 
        <div className="title">
            <h1>About Features</h1>
        </div>
        <Jumbo className="jumbo col-lg-12 row justify-content-around">
                <div className="card col-lg-6">
                    <div className="img-card">
                        <img src="./images/chat.svg" />
                    </div>
                    <h5 className="card-title">Bot Features
                        <hr />
                    </h5>
                    <ul> 					
                        <li><i class="fas fa-check select"></i><p>Can get ordering from customer</p></li>
                        <div className="mt-3"></div>					
                        <li><i class="fas fa-check select"></i><p>Can understand and answer customer as what we teach</p></li>
                        <div className="mt-3"></div> 					
                        <li> <i class="fas fa-check select"></i><p>Can do dealing by itself</p></li>
                        			
                    </ul>
                </div>

                <div className="card col-lg-6">
                    <div className="img-card">
                        <img src="./images/delivery-truck.svg" />
                    </div>
                    <h5 className="card-title">Parcel Features
                        <hr />
                    </h5>
                    <ul> 					
                        <li><i class="fas fa-check"></i><p>Can issue a cover sheet for the parcel</p></li>
                        <div className="mt-4"></div> 
                        <li><i class="fas fa-check"></i><p>Can issue tracking number</p></li>
                        <div className="mt-4"></div>  					
                        <li><i class="fas fa-check"></i><p>Can keep the address</p></li> 					
                         				
                    </ul>
                </div>

                <div className="card col-lg-6">
                    <div className="img-card">
                        <img src="./images/statistics.svg"/>
                    </div>
                    <h5 className="card-title">Visualization Feature
                    <hr />
                    </h5>
                    <ul> 					
                        <li><i class="fas fa-check"></i><p>Able to check sales on time</p></li>
                        <div className="mt-4"></div>  					
                        <li><i class="fas fa-check"></i><p>Able to check product balances</p></li>
									
                    </ul>
                </div>
            
        </Jumbo>
        </Container>
    </Styles>
)


