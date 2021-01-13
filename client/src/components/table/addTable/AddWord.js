import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Col, Form, Button, Container } from "react-bootstrap";


const Background = styled.div`
  // width: 100%;
  // height: 100%;
  // background: rgba(0, 0, 0, 0.8);
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
  transform: translate(25%, -10%);
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


export const AddWord = ({ showWord, setShowWord}) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showWord ? 1 : 0,
    transform: showWord ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowWord(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showWord) {
        setShowWord(false);
        console.log('I pressed');
      }
    },
    [setShowWord, showWord]
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
    {showWord ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container className="col-sm-10 col-md-9">
            <ModalWrapper showWord={showWord}>
              <ModalContent>
              <Form.Group>
                <h1>Add youe Question and Answer</h1>
                <Form.Row>
                <Form.Label column>
                  Question
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Question" />
                </Col>
                </Form.Row>
                <br />
                <Form.Row>
                <Form.Label column>
                  Answer
                </Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Answer" />
                </Col>
                </Form.Row>
                <br />
              </Form.Group>
              <Button className="qa-comfirm" variant="success">Comfirm</Button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowWord(prev => !prev)}
              />
            </ModalWrapper>
            </Container>
          </animated.div>
        </Background>
      ) : null}
    </div>
    );
    
  
};

export default AddWord;