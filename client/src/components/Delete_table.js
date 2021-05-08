import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import { Container } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import ImageWarnning from "./Images/warnning2.png";

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
  z-index :1000;
  width: 350px;
  background-color: white;
  padding: 3rem;
  border-radius: 0.5rem;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
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
  /* line-height: 1.8; */

.button-delete-bot{
  text-align: center;
}

.button-delete-bot .cancle-delete-bot{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 25px;
  border: 1px solid #0078ff;
  transition: 0.5s;
  margin: 10px;
  background-color: #fff;
  color: #0078ff;

}

.button-delete-bot .cancle-delete-bot:hover{
  color:#fff;
}

.button-delete-bot .delete-bot{
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 25px;
    border: 1px solid #CD5C5C;
    transition: 0.5s;
    margin: 10px;
    background-color: #CD5C5C;
    color: #fff;
}
.button-delete-bot .delete-bot:hover{
  color: #000;
}

img{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
`;

function Delete_table({showDelete_table, setShowDelete_table,selectedFlatRows, id, delete_trained }) {
   
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showDelete_table ? 1 : 0,
    transform: showDelete_table ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowDelete_table(false);
    }
  };

  // const ConfirmDelete = (data) => {
  //   setShowDelete_table(prev => !prev)
  //   console.log(data)
  //     var newdata = []
  //     var i = 0
  //     for (i = 0; i < data.length; i++){
  //         newdata.push(data[i].original)
  //     }
      
  //     console.log(newdata)
      
  //     if (data[0]){
  //         fetch('/train_bot/delete/trained/'+data[0].original.id, {
  //             method : 'POST',
  //             headers : {
  //                 "Access-Control-Allow-Origin": "*",
  //                 'Content-Type':'application/json'
  //                 },
  //                 body : JSON.stringify(newdata),
  //             });
  //             console.log(data)
  //             window.location.reload("bot/"+id+'/trained');
  //     }    
  
  // }

  const ConfirmDelete = (data) => {
    console.log(data)
      delete_trained(data)
      setShowDelete_table(prev => !prev)
  }
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showDelete_table) {
        setShowDelete_table(false);
        console.log('I pressed');
      }
    },
    [setShowDelete_table, showDelete_table]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <div>
      {showDelete_table ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container>
              <ModalWrapper showDelete_table={showDelete_table}>
                <ModalContent>
                  <div>
                    <img src={ImageWarnning} alt="warnning" className="warnning_img" />
                  </div>
                  You want delete this word?
                <Container className="button-delete-bot">
                    <Button className="cancle-delete-bot" onClick={() => setShowDelete_table(prev => !prev)}>cancle</Button>
                    <Button className="delete-bot" onClick={() => ConfirmDelete(selectedFlatRows)}>delete</Button>
                </Container>
                </ModalContent>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => setShowDelete_table(prev => !prev)}
                />
              </ModalWrapper>
            </Container>
          </animated.div>
        </Background>
      ) : null}
    </div>
  );

};

export default Delete_table;
