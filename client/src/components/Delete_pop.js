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
  background: blue;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background :rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalWrapper = styled.div`
  width: 500px;
  background-color: white;
  padding: 3rem;
  border-radius: 0.5rem;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 35px;
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
  padding: 7px 20px;
  font-size: 15px;
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
    padding: 7px 20px;
    font-size: 15px;
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
  width: 70%;
}
`;

function Delete_pop({ showDelete_pop, setShowDelete_pop, Delete_bot, bot }) {

  const ConfirmDelete = (bot) => {
    Delete_bot(bot)
    setShowDelete_pop(prev => !prev)
  }

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

  return (
    <div>
      {showDelete_pop ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <Container>
              <ModalWrapper showDelete_pop={showDelete_pop}>
                <ModalContent>
                  <div>
                    <img src={ImageWarnning} alt="warnning" className="warnning_img" />
                  </div>
                  you want to delete this bot?
                <Container className="button-delete-bot">
                    <Button className="cancle-delete-bot" onClick={() => setShowDelete_pop(prev => !prev)}>cancle</Button>
                    <Button className="delete-bot" onClick={() => { ConfirmDelete(bot)}}>delete</Button>
                  </Container>
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
