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
    margin-top: 45%;
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
    text-align: center;
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
    // background-color: black;
    margin-bottom:10%;
}

.img-card {
    margin-left: 20%;
}

.svg-bg {
    position: absolute;
    left: 0px;
    right: 0px;
    top:0px;
    margin-top: 45%;
    z-index:-1;
}

.svg-bg .wave1-svg {
    position: relative;
    left: 0px;
    right: 0px;
    top:0px;
    margin-top: 10%;
    z-index:-1;
}

.svg-bg .wave2-svg {
    position: relative;
    left: 0px;
    right: 0px;
    top:0px;
    z-index:-1;
}
.svg-bg .rec-svg {
    position: relative;
    left: 0px;
    right: 0px;
    top:0px;
    max-width: 100%;
    z-index:-1;
}

`;

export const CardList = () => (
    <Styles >
        <div className="svg-bg" >
            <svg height="100%" width="100%"  className="wave1-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#f6f6f6" fill-opacity="1" d="M0,128L48,154.7C96,181,192,235,288,229.3C384,224,480,160,576,133.3C672,107,768,117,864,128C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
</svg> 
<svg height="100%" xmlns="http://www.w3.org/2000/svg" className="rec-svg" viewBox="0 0 1440 320"><path fill="#f6f6f6" fill-opacity="1" d="M0,320L0,0L1440,0L1440,320L0,320L0,320Z"></path></svg>
<svg height="50%" xmlns="http://www.w3.org/2000/svg" className="rec-svg" viewBox="0 0 1440 320"><path fill="#f6f6f6" fill-opacity="1" d="M0,320L0,0L1440,0L1440,320L0,320L0,320Z"></path></svg>
{/* <svg height="100%" xmlns="http://www.w3.org/2000/svg" className="rec-svg" viewBox="0 0 1440 320"><path fill="#f6f6f6" fill-opacity="1" d="M0,320L0,0L1440,0L1440,320L0,320L0,320Z"></path></svg> */}
<svg height="100%" width="100%" className="wave2-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#f6f6f6" fill-opacity="1" d="M0,128L48,154.7C96,181,192,235,288,229.3C384,224,480,160,576,133.3C672,107,768,117,864,128C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
</svg> 
        
        
        </div>
{/* <svg height="100%" width="100%" id="bg-svg" viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,500 C 0,500 0,166 0,166 C 116.57142857142858,188.10714285714286 233.14285714285717,210.21428571428572 349,202 C 464.85714285714283,193.78571428571428 580,155.25 705,149 C 830,142.75 964.8571428571429,168.7857142857143 1089,177 C 1213.142857142857,185.2142857142857 1326.5714285714284,175.60714285714283 1440,166 C 1440,166 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="#0693e388" class="transition-all duration-300 ease-in-out delay-150"></path><path d="M 0,500 C 0,500 0,333 0,333 C 118.10714285714286,294.5 236.21428571428572,256 349,280 C 461.7857142857143,304 569.2500000000001,390.5 683,392 C 796.7499999999999,393.5 916.7857142857142,310 1044,286 C 1171.2142857142858,262 1305.607142857143,297.5 1440,333 C 1440,333 1440,500 1440,500 Z" stroke="none" stroke-width="0" fill="#0693e3ff" class="transition-all duration-300 ease-in-out delay-150"></path></svg> */}
       
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


