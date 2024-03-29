import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Button, Container } from "react-bootstrap";


const Background = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px !important;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  z-index: 10;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 200px;
`;

const ModalContent = styled.div`

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






export const AddMapping = ({ showWord, setShowWord,botID}) => {
  const modalRef = useRef();
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const addmapping =(id)=>{
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
            <Container>
            <ModalWrapper showWord={showWord}>
              <ModalContent>
                <article className="part AddMapping">
                  <h1>
                    Add your Question and Answer
                  </h1>
                  <form>
                    <div className="group-Question">
                      <label for="AddQuestion">Question</label>
                      <input type="text" className="input-question" onChange={(e)=>setQuestion(e.target.value)} placeholder="Question"></input>
                    </div>
                    <div className="group-Answer">
                      <label for="AddAnswer">Answer</label>
                      <input type="text" className="input-answer" onChange={(e)=>setAnswer(e.target.value)} placeholder="Answer"></input>
                    </div>
                  </form>
                </article>
              <Button className="qa-comfirm" variant="success" onClick = {() => addmapping(botID) }>Comfirm</Button>
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

export default AddMapping;


{/* <Form.Group>
                <h1>Add your Question and Answer</h1>
                <Form.Row>
                <Form.Label column>
                  Question
                </Form.Label>
                <Col>
                  <Form.Control type="text" className="input-question" onChange={(e)=>setQuestion(e.target.value)} placeholder="Question" />
                </Col>
                </Form.Row>
                <br />
                <Form.Row>
                <Form.Label column>
                  Answer
                </Form.Label>
                <Col>
                  <Form.Control type="text" className="input-answer" onChange={(e)=>setAnswer(e.target.value)} placeholder="Answer" />
                </Col>
                </Form.Row>
                <br />
              </Form.Group> */}