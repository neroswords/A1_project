import React from 'react';
import styled from 'styled-components';
import { Container, Jumbotron as Jumbo } from 'react-bootstrap';
// import PhoneG from './image/phone_group.png';


const Styles = styled.div`
.jumbo {
    align-items: center;
}

.container {
    // background: url(${process.env.PUBLIC_URL +'/images/Background.png'}) no-repeat fixed bottom;
    background-size: 100%;
    margin-bottom: 10%;
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
  height: 25rem;
  margin-bottom: 5%;
  border-radius: 5px;
  background: #fff;
//   box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
//   transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  padding: 3%;
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
  }

h5 {
    margin: 2%;
}
`;

export const CardList = () => (
    <Styles >
        <Container className="container"> 
        <div className="title">
            <h1>About Features</h1>
        </div>
        <Jumbo className=" jumbo d-flex position-relative">
            <div className="card">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Feature1</h5>
                <p className="card-text">ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp</p>
            </div>
            <div className="card ms-4 ">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Feature2</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card ms-4">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Feature3</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card ms-4">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Feature4</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="card ms-4">
                <img src="./images/phone_group.png" width="100%"/>
                <h5 className="card-title">Feature5</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </Jumbo>
        </Container>
    </Styles>
)


