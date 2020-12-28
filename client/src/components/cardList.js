import React from 'react';
import styled from 'styled-components';
import { Container, Jumbotron as Jumbo } from 'react-bootstrap';
// import PhoneG from './image/phone_group.png';


const Styles = styled.div`
.jumbo {
    background: url(${process.env.PUBLIC_URL +'/images/Bg-home.png'}) no-repeat fixed bottom;
    background-size: cover;
    height: 200px;
    position: relative;
    z-index: -2;
    
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
  background: #fff;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  padding: 3%;
  cursor: pointer;
}

.card:hover{
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
`;

export const CardList = () => (
    <Styles>
        <Jumbo className="jumbo row justify-content-around">
                <div className="card">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Card title</h5>
                <p className="card-text">ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp</p>
            </div>
            <div className="card">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </Jumbo>
    </Styles>
)


