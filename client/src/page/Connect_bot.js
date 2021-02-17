import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import Facebookform from '../Components/Form/facebookform';
import Lineform from '../Components/Form/lineform';
import { withRouter, Redirect } from 'react-router-dom'

import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Container } from "react-bootstrap";

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
    margin-top: 2%;
  }

  .card-bot{
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }
  
  .card-bot .card-title {
    margin-bottom: 2rem;
    font-size: 2rem;
    text-transform : uppercase;
    font-family: 'Roboto', sans-serif;
  }
  
  .card-bot .card-body {
    margin: 1rem;
  }
  

  .title_part p{
    font-weight: bold;
    margin-top: 5%;
    font-size: 23px;

  }

  .title_part  .line{
    border: 10px;
    height: 4px;
    background-color: #fca311;
    width: 200px;
    margin-bottom: 5%;
  }

  .form-bot .btn {
    border-radius: 1rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 0.75rem;
    transition: all 0.2s;
    width: 80%;
    align-items: center;
    /* background-color: #; */
  }
  .btn-createbot{
      margin-top: 3rem;
      text-align : center;
  }

  .form-bot input {
    border-radius: 0.5rem;
  }

  .form-bot select{
    border-radius: 0.5rem;
  }

  .row-2{
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  input[type=file]::-webkit-file-upload-button {
    border: 2px;
    padding: 0.5rem ;
    border-radius: 0.75rem;
    background-color: #fca311;
    transition: 1s;
    color: white;
    width: 40%;
    
  }
  
  input[type="file"] {
    max-width: 100%;
  }

  .showimage {
    margin-bottom: 1%;
    text-align: center;
  }

  .showimage img{
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 80%;
    text-align: center;
  }
  
  .vertical-line {
    border-left: 1px solid black;

  }

  .btn-facebook {
    background-color: #0078ff;
  }

  .btn-line {
    background-color: #34a853 ;
  }
  
  .con-line{
    margin-left: 50px;
  }

  .connect_platform{
    text-align: center;
  }

  .connect_platform button{
    padding: 7px 10px;
    border-radius: 40px;
    
  }
  

`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  /* position: absolute; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  
`;

const ModalWrapper = styled.div`
  width: 400px;
  height: 550px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #fff;
  z-index: -10 !important;
  grid-template-columns: 1fr 1fr;
  position: absolute;
  margin-top: 20%;
  /* display: grid; */
  /* position: absolute;
  /* top: 50%;
  /* left: 50%; */
  /* transform: translate(0%, -180%); */
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 25px;
  height: 25px;
  padding: 0;
  z-index: 10;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`;


export function Connect_bot({ setShowForm, showForm, botID }) {
  const [platform, setplatform] = useState("facebook")
  const renderSwitch = (platform, bot_id) => {
    switch (platform) {
      case 'facebook':
        return <Facebookform props={bot_id} />
      default:
        return <Lineform props={bot_id} />
    }
  }

  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showForm ? 1 : 0,
    transform: showForm ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowForm(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
        console.log('I pressed');
      }
    },
    [setShowForm, showForm]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <Styles>
      <div>
        {showForm ? (
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              {/* <Container> */}
                <ModalWrapper showForm={showForm}>
                  <ModalContent>
                    <div>
                      <button className="con-facebook btn btn-primary text-uppercase" onClick={() => setplatform("facebook")} type=""><i class="icon-facebook fab fa-facebook fa-2x"></i></button>
                      <button className="con-line btn btn-success btn-line text-uppercase" onClick={() => setplatform("line")} type=""><i class="icon-line fab fa-line fa-2x"></i></button>
                    </div>
                    {renderSwitch(platform, botID)}

                  </ModalContent>
                  <CloseModalButton
                    aria-label="Close modal"
                    onClick={() => setShowForm(prev => !prev)}
                  />
                </ModalWrapper>
              {/* </Container> */}
            </animated.div>
          </Background>
        ) : null}
      </div>

    </Styles>
  )
}


export default withRouter(Connect_bot);         