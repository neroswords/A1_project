import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Container } from "react-bootstrap";

const Background = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  z-index: 10;
  border-radius: 10px;
  position: sticky;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 200px;
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

const ModalContent = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  
  button {
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

  button:hover{
    color: #000;
  }

`;

function Delete_pop({showDelete_pop, setShowDelete_pop}){
    const modalRef = useRef();
    const animation = useSpring({
        config: {
          duration: 250
        },
        opacity: showDelete_pop ? 1 : 0,
        transform: showDelete_pop ? `translateY(0%)` : `translateY(-100%)`
      });
    
      const closeModal = e => {
        if (modalRef.current === e.target) {
          setShowDelete_pop(false);
        }
      };
    
      const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && showDelete_pop) {
            setShowDelete_pop(false);
            console.log('I pressed');
          }
        },
        [setShowDelete_pop, showDelete_pop]
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
        {showDelete_pop ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container className="col-sm-10 col-md-9">
            <ModalWrapper showDelete_pop={showDelete_pop}>
              <ModalContent>
            
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowDelete_pop(prev => !prev)}
              />
            </ModalWrapper>
            </Container>
          </animated.div>
        </Background>
      ) : null}
        </div>
    );

};

export default Delete_pop;
