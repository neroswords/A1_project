import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Container } from "react-bootstrap";
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
  width: 550px;
  height: 400px;
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


  .input-group{
    box-shadow: none;
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
    outline: none;
    margin-bottom: 10px;
    font-size: 16px;
    padding: 5px 0;

  }

  
  form input{
    width: 100%;
  }

  .group-Question{
    margin-top: 5%;
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


export const AddGroup = ({ showAddGroup, setShowAddGroup,botID}) => {
  const [message,setMessage] = useState('')
  const [showMessage,setShowMessage] = useState(false)
  const modalRef = useRef();
  const [question, setQuestion] = useState('')

  console.log(showMessage)
  const closePop = () =>{
    // setFlash('')
    setShowAddGroup(prev => !prev)
  }

  function handleClick(e) {
    console.log(question)
    e.preventDefault();
    console.log('The link was clicked.');
    const qLength = question.replace(/^\s+|\s+$/gm,'').length
    // console.log(qLength)
    
    if (qLength == ''){
      console.log("null")
      setMessage("Please fill Group name")
      setShowMessage(true)
    }
    else{
      addgroup(botID)
    }
  }

  const addgroup =(id)=>{
    
    
    const data = {'group' : question, 'botID' : id}
    console.log(data)
    fetch('/bot/'+id+'/addgroup', {
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
        window.location.reload("bot/"+id+'/group');
      }
    }))
    // window.location.reload("bot/"+id+'/trained');
  };

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showAddGroup ? 1 : 0,
    transform: showAddGroup ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
        setShowAddGroup(false);
      // window.location.replace("/login")
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showAddGroup) {
        setShowAddGroup(false);
        console.log('I pressed');
      }
    },
    [setShowAddGroup, showAddGroup]
    
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
      if (showAddGroup == false) {
        
        setShowMessage(false)
      }
    },
    [showAddGroup]
  );
  
  return(
    <div>
    {showAddGroup ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container>
            <ModalWrapper showAddGroup={showAddGroup}>
              <ModalContent>
                <article className="part Addword">
                  <h1 name="addgroup-popup">
                    Add your Group name
                  </h1>
                  <form>
                    <div className="group-Question">
                      <label for="AddGroupName">Group name</label>
                      <input type="text" pattern="[A-Za-z0-9]+" className="input-group" id="group" name="input-group" onChange={(e)=>setQuestion(e.target.value)} placeholder="Group name"></input>
                    </div>
                    { showMessage &&  
                                  
                                      <FlashMessage duration={4000}>
                                        <div className="detect">
                                          <strong>{message}</strong>
                                        </div>  
                                      </FlashMessage>
                                  
                      }
                    {/* <div className="group-Answer">
                      <label for="AddAnswer">Answer</label>
                      <input type="text" pattern="[A-Za-z0-9]+" className="input-answer" name="input-answer" id="answer" onChange={(e)=>setAnswer(e.target.value)} placeholder="Answer"></input>
                    </div> */}
                  </form>
                </article>
              <button type="submit" className="qa-comfirm" variant="success" name="btn-addgroup-confirm" onClick={handleClick} >Comfirm</button>
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

export default AddGroup;