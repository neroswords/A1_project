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

// .content:after{
//   background-color: #e17b77;
//   content: '';
//   position: absolute;
//   width: 4px;
//   height: 100%;
//   margin-left:45%;
// }

.content{
  margin:90px auto;
  width: 360px;
  border-left: 2px solit #ccc;
  padding: 0 20px 0 30px;
}

.content div{
  background-color: #ffc15e;
  padding: 10px 10px;
  font-size: 16px;
  line-height: 1.7;
  position: relative;
  height: 60px;
  width: 60px;
  margin-bottom: 30px;
  margin-left: 45%;
  border-radius: 5px;
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


export const Mapchart = ({ showMap, setShowMap}) => {
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
                  {/* <div className="container_word"> */}
                    <div className="content">
                      <div>
                        <a>hiii</a>
                      </div>
                      <div>
                        <a>heyy</a>
                      </div>
                      <div>
                        <a>hello</a> 
                      </div>
                    </div>
                  {/* </div> */}
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

export default Mapchart;