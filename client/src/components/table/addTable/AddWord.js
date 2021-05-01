import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Button, Container } from "react-bootstrap";
import FlashMessage from 'react-flash-message'


const Background = styled.div`
  width: 100%;
  height: 100%;
  /* background: blue; */
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background :rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100; 
`;

const ModalWrapper = styled.div`
  z-index: 1000;
  width: 800px;
  height: 500px;
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
  top: 25px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;


export const AddWord = ({ showWord, setShowWord,botID}) => {
  const [message,setMessage] = useState('')
  const [showMessage,setShowMessage] = useState(false)
  const modalRef = useRef();
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  console.log(showMessage)
  const closePop = () =>{
    // setFlash('')
    setShowWord(prev => !prev)
  }

  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    const qLength = question.replace(/^\s+|\s+$/gm,'').length
    const aLength = answer.replace(/^\s+|\s+$/gm,'').length
    console.log(qLength)
    
    if (qLength == 0 || aLength == 0 ){
      console.log("null")
      setMessage("Please fill question or answer")
      setShowMessage(true)
    }
    else{
      addword(botID)
    }
  }

  const addword =(id)=>{
    
    
    const data = {'question' : question,'answer' : answer ,'botID' : id}
    fetch('/bot/'+id+'/addword', {
    method : 'POST',
    headers : {
        "Access-Control-Allow-Origin": "*",
        'Content-Type':'application/json'
        },
    body: JSON.stringify(data)}).then(res => res.json().then(data => {
      // console.log(data)
      if ("error" in data ){
        
        setMessage(data["error"])
        setShowMessage(true)

      }
      else{
        window.location.reload("bot/"+id+'/trained');
      }
    }))
    // window.location.reload("bot/"+id+'/trained');
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
      // window.location.replace("/login")
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

  useEffect(
    () => {
      // console.log(showWord)
      if (showWord == false) {
        
        setShowMessage(false)
      }
    },
    [showWord]
  );
  
  return(
    <div>
    {showWord ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container>
            <ModalWrapper showWord={showWord}>
              <ModalContent>
                <article className="part Addword">
                  <h1 name="addword-popup">
                    Add your Question and Answer   
                  </h1>
                  <form>
                    <div className="group-Question">
                      <label for="AddQuestion">Question</label>
                      <input type="text" pattern="[A-Za-z0-9]+" className="input-question" id="question" name="input-question" onChange={(e)=>setQuestion(e.target.value)} placeholder="Question"></input>
                    </div>
                    { showMessage &&  
                                  
                                      <FlashMessage duration={4000}>
                                        <div className="detect">
                                          <strong>{message}</strong>
                                        </div>  
                                      </FlashMessage>
                                  
                      }
                    <div className="group-Answer">
                      <label for="AddAnswer">Answer</label>
                      <input type="text" pattern="[A-Za-z0-9]+" className="input-answer" name="input-answer" id="answer" onChange={(e)=>setAnswer(e.target.value)} placeholder="Answer"></input>
                    </div>
                  </form>
                </article>
              <button type="submit" className="qa-comfirm" variant="success" name="btn-addword-confirm" onClick={handleClick} >Comfirm</button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => closePop()}
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