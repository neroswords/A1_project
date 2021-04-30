import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import Facebookform from '../Components/Form/facebookform';
import Lineform from '../Components/Form/lineform';
import Etcform from '../Components/Form/etc';
import { withRouter, Redirect } from 'react-router-dom'
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';

const Styles = styled.div`
  .container {
    font-family: 'Public Sans', sans-serif;
    margin-top: 2%;
  }
 
  .con-line{
    margin-left: 50px;
  }

  .connect_platform button{
    padding: 7px 5px;
    border-radius: 40px;
  }
  
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: blue;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background : rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalWrapper = styled.div`
  background-color: white;
  padding: 3rem 3rem;
  border-radius: 0.5rem;
  /* width: 400px; */
  /* height: 550px; */
  /* z-index: 1000; */
  /* position: absolute; */
  /* top: calc(100% - 450px); // half of width */
  /* right: calc(100% - 800px); // half of height */

  /* box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2); */
  /* border-radius: 10px; */
  /* background: #f4f4f4; */
  /* grid-template-columns: 1fr 1fr; */
  /* display: grid; */
  /* top: 50%;
  left: 50%; */
  /* transform: translate(0%, -180%); */
  /* @media (max-width: 960px) {
      background: red;
    } */
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
  /* margin-top: 20%; */
`;


export function Connect_bot({ setShowForm, showForm, botID }) {
  const [platform, setplatform] = useState("facebook")
  const renderSwitch = (platform) => {
    switch (platform) {
      case 'facebook':
        return <Facebookform botID={botID} />
      case 'etc':
        return <Etcform botID={botID} />
      default:
        return <Lineform botID={botID} />
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
      <div className="model-popup">
        {showForm ? (
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              {/* <Container> */}
                <ModalWrapper showForm={showForm}>
                  <ModalContent>
                    <div>
                      <button className="con-facebook btn btn-primary text-uppercase" onClick={() => setplatform("facebook")} type=""><i class="icon-facebook fab fa-facebook fa-2x"></i></button>
                      <button className="con-line btn btn-success btn-line text-uppercase" onClick={() => setplatform("line")} type=""><i class="icon-line fab fa-line fa-2x"></i></button>
                      <button className="con-line btn btn-success btn-line text-uppercase" onClick={() => setplatform("etc")} type=""><i class="fas fa-filter"></i></button>
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