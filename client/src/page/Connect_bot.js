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
    padding: 5px 5px;
    border-radius: 40px;
  }

  i.icon-connect {
    font-size: 30px;
  }

  i.fa-filter{
    font-size: 27px;
  }

  .unselect-platform{
    background-color: #dedede;
    color: white;
    /* border: none; */
    border-radius: 0.25rem;
    border: 1px solid transparent;
    padding: 5px 7px;
  }

  .connect-platform {
    width: 300px;
    display: flex;
    justify-content:space-evenly; 
    /* background-color: red; */
  }

  .connect-platform .btn-select-facebook{
    background-color: #0078ff;
    color: white;
    border: 1px solid #0078ff;
   border-radius: 0.25rem;
   padding : 5px 10px;
  }

  .connect-platform .btn-select-line{
    background-color: #34a853;
    color: white;
    border: 1px solid #34a853;
   border-radius: 0.25rem;
   padding : 5px 10px;
  }

  .connect-platform .btn-select-etc{
    background-color: #fca311;
    color: white;
    border: 1px solid #fca311;
   border-radius: 0.25rem;
   padding : 6px 10px;
  }

  .title-popup-connect{
    font-size: 19px;
    font-weight: 600;
    margin-bottom: 25px;
  }

`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background : rgba(0, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000000;
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


export function Connect_bot({ setShowForm, showForm, botID,setReload }) {
  const [platform, setplatform] = useState("facebook")
  
  const renderSwitch = (platform) => {
    switch (platform) {
      case 'facebook':
        return <Facebookform botID={botID} setReload={setReload} setShowForm={setShowForm} />
      case 'etc':
        return <Etcform botID={botID} setReload={setReload} setShowForm={setShowForm}/>
      default:
        return <Lineform botID={botID}  setReload={setReload} setShowForm={setShowForm}/>
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
      <div className="model-popup-botlist">
        {showForm ? (
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              {/* <Container> */}
                <ModalWrapper showForm={showForm}>
                  <ModalContent>
                  <h4 className="title-popup-connect"> Select platform to connect bot</h4>
                    <div className="connect-platform">
                      <button className={"unselect-platform" + (platform == 'facebook' ? ("btn btn-select-facebook") : (""))}  onClick={() => setplatform("facebook")} type=""><i className="icon-connect fab fa-facebook "></i></button>
                      <button className={"unselect-platform" + (platform == 'line' ? ("btn btn-select-line") : (""))} onClick={() => setplatform("line")} type=""><i className="icon-connect fab fa-line "></i></button>
                      <button className={"unselect-platform" + (platform == 'etc' ? ("btn btn-select-etc") : (""))} onClick={() => setplatform("etc")} type=""><i className="icon-connect fas fa-filter "></i></button>
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