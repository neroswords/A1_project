import React, { useRef, useEffect, useCallback} from 'react';
import styled from 'styled-components'; // import style เพื่อที่ทำการกำหนด css
import { useSpring, animated } from 'react-spring'; // import animate และ useSpring ที่ถูกใช้ในส่วยของ animation ของ pop up
import { MdClose } from 'react-icons/md'; // import ปุ่ม cross ของ pop up
import { Container } from "react-bootstrap"; // import container ที่มีการใช้
import Button from '@material-ui/core/Button'; // import ปุ่ม button ที่มีการใช้
import ImageWarnning from "./Images/warnning2.png"; // import รูปที่ต้องใสาเข้าไปใน pop up

// กำหนด css ของกล่อง pop up
const Background = styled.div` 
  width: 100%;
  height: 100%;
  /* background: blue; */
  /* position: absolute; */
  display: flex;
  justify-content: center;
  align-items: center;
  background :rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20; 
`;
// กำหนด css ของพื้นหลังนอก pop up
const ModalWrapper = styled.div`
z-index: 1000;
  width: 500px;
  background-color: white;
  padding: 3rem;
  border-radius: 0.5rem;
  z-index: 30;
`;
// กำหนด css ปุ่ม crossที่ทำการปิด pop up
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
// กำหนด css เนื้อหาใน pop up
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
// รับค่ามาจากหน้า botlist
function Delete_pop({ showDelete_pop, setShowDelete_pop, Delete_bot, bot }) {
  // ยืนยันการ delete
  const ConfirmDelete = (bot) => {
    Delete_bot(bot) 
    // เมื่อกด bot จะถูกลบ และ pop up จะ หายไป
    setShowDelete_pop(prev => !prev)
  }
  // กำหนดตัวmodal เพื่อที่จะเรียกใช้ใน closeModal
  const modalRef = useRef();
  // กำหนดการ animation ของ pop up  
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showDelete_pop ? 1 : 0,
    transform: showDelete_pop ? `translateY(0%)` : `translateY(-100%)`
  });
  // กำหนดปุ่ม cross เพื่อปิดตัว pop up 
  const closeModal = e => {
    // ถ้า modalRefที่ได้กำหนดใน ref มีการกด ตัว delete_pop จะปิดไป
    if (modalRef.current === e.target) {
      setShowDelete_pop(false);
    }
  };
  // ทำการกำหนดว่าถ้ามีการกด Escape ให้ทำาร ปิด pop up
  const keyPress = useCallback(
    e => {
      // ถ้ามีการกด Escape ตัว delete_pop จะปิดไป
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
      {/* ถ้ามีการเรียกใช้ showDelete_pop ก็จะขึ้น pop up ขึ้นมา */}
      {showDelete_pop ? (
        //กำหนดว่าเมื่อกดพื้นหลังนอก pop up ให้ทำการปิด pop up
        <Background onClick={closeModal} ref={modalRef}>
          {/* เรียกใช้ animation ที่ถูกสรา้งที่ const animation*/}
          <animated.div style={animation}>
            {/* ส่วนของกล่องcontainer pop up */}
            <Container>
              {/* ทำการเรียกการแสดงตัว pop up */}
              <ModalWrapper showDelete_pop={showDelete_pop}>
                {/* ส่วนของเนื้อหาข้างใน pop up */}
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
                {/* แสดงปุ่ม cross ที่ทำการปิด pop up */}
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => setShowDelete_pop(prev => !prev)} //เมื่อทำการกดตัว pop up จะถูกปิด
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
