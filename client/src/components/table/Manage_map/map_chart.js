import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Container } from "react-bootstrap";


const Background = styled.div`
  position: fixed;
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
  position: absolute;
  z-index: 10;
  border-radius: 10px;
  transform: translate(30%, -70%);
  // align-items: center;
  // grid-template-columns: 1fr 1fr;
  // position: absolute;
  // top: 50%;
  // left: 50%;
`;

const ModalContent = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
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


export const Map_chart = ({ showMap, setShowMap}) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showMap ? 1 : 0,
    transform: showMap ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowMap(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showMap) {
        setShowMap(false);
        console.log('I pressed');
      }
    },
    [setShowMap, showMap]
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
    {showMap ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container className="col-sm-10 col-md-9">
            <ModalWrapper showMap={showMap}>
              <ModalContent>
                  <h1>Hiiii</h1>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowMap(prev => !prev)}
              />
            </ModalWrapper>
            </Container>
          </animated.div>
        </Background>
      ) : null}
    </div>
    );
    
  
};

export default Map_chart;