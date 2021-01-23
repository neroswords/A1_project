import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Col, Form, Button, Container } from "react-bootstrap";


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
  transform: translate(30%, -10%);
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



export const AddWord = ({ showWord, setShowWord,botID}) => {
  const modalRef = useRef();
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const addword =(id)=>{
    const data = {'question' : question,'answer' : answer ,'botID' : id}
    fetch('/bot/'+id+'/addword', {
    method : 'POST',
    headers : {
        "Access-Control-Allow-Origin": "*",
        'Content-Type':'application/json'
        },
    body: JSON.stringify(data)}).then(setShowWord(prev => !prev))
    window.location.reload("bot/"+id+'/trained');
  };

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
      window.location.replace("/login")
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
                <h1>Add your Question and Answer</h1>
                <Form.Row>
                <Form.Label column>
                  Question
                </Form.Label>
                <Col>
                  <Form.Control type="text" onChange={(e)=>setQuestion(e.target.value)} placeholder="Question" />
                </Col>
                </Form.Row>
                <br />
                <Form.Row>
                <Form.Label column>
                  Answer
                </Form.Label>
                <Col>
                  <Form.Control type="text" onChange={(e)=>setAnswer(e.target.value)} placeholder="Answer" />
                </Col>
                </Form.Row>
                <br />
              </Form.Group>
              <Button className="qa-comfirm" variant="success" onClick = {() => addword(botID)   }>Comfirm</Button>
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