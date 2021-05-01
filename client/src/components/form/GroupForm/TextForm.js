import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Button, Container } from "react-bootstrap";


const Background = styled.div`
  width: 100%;
  height: 100%;
  background: blue;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background :rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalWrapper = styled.div`
  height: 30rem;
  width: 25rem;
  background-color: white;
  padding: 3rem;
  border-radius: 0.5rem;
`;

const ModalContent = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;

  
  .qa-comfirm {
    padding: 5px 12px;
    margin-top: 15px;
    font-size: 19px;
    border-radius: 25px;
    border: 3px solid #ffc15e;
    transition: 0.5s;
    margin: 10px;
    background-color: #ffc15e;
    color: #fff;
  }

 .qa-comfirm:hover{
    color: #000;
  }


  .input-question{
    box-shadow: none;
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
    outline: none;
    margin-bottom: 10px;
    font-size: 16px;
    padding: 5px 0;

  }

  .input-answer{
    box-shadow: none;
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
    outline: none;
    margin-bottom: 20px;
    font-size: 16px;
    padding: 5px 0;
  }

  form input{
    width: 100%;
  }

  .group-Question{
    margin-top: 5%;
  }

  .group-Answer{
    margin-top: 2%;
  }

`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;


export const TextForm = ({ showForm, setShowForm,botID}) => {
  const modalRef = useRef();

//   const addword =(id)=>{
//     const data = {'question' : question,'answer' : answer ,'botID' : id}
//     fetch('/bot/'+id+'/addword', {
//     method : 'POST',
//     headers : {
//         "Access-Control-Allow-Origin": "*",
//         'Content-Type':'application/json'
//         },
//     body: JSON.stringify(data)}).then(setShowWord(prev => !prev))
//     window.location.reload("bot/"+id+'/trained');
//   };

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
      window.location.replace("/login")
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
  
  return(
    <div>
    {showForm ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container>
            <ModalWrapper showForm={showForm}>
              <ModalContent>
                <div>
                    <button><i class="icon-facebook fab fa-facebook fa-2x"></i></button>
                    <button><i class="icon-line fab fa-line fa-2x"></i></button>
                </div>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowForm(prev => !prev)}
              />
            </ModalWrapper>
            </Container>
          </animated.div>
        </Background>
      ) : null}
    </div>
    );  
};

export default TextForm;