// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client'
// import styled from 'styled-components';
// import { Redirect } from 'react-router-dom';

// const Styles = styled.div` 
// /* .chat-page {
//     display: flex;
//     min-height: 90vh;
// } */
// .chat-body {
//     /* margin: 2%; */
//     width: 100%;
//     background-color: #fff;
//     /* overflow:hidden; */
//     /* background-color: white; */
// }

// .main__chatcontent {
// background-color: #fff;
//   flex-grow: 1;
//   padding: 20px 20px 40px 0 ;
//   max-width: 100%;
//   /* border-right: 1px solid #ebe7fb;
//   margin-right: 2%; */
// }

// .content__header {
//   padding-bottom: 15px;
//   border-bottom: 1px solid #ebe7fb;
// }

// /* .current-chatting-user {
//   display: flex;
//   align-items: center;
// } */

// /* .current-chatting-user p {
//   margin: 0;
//   font-weight: 600;
// } */

// .content__header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// /* 
// .settings .btn-nobg {
//   color: #000;
// } */

// .content__body {
//   height: 60vh;
//   overflow: auto;
// }

// .chat__item {
//   display: flex;
//   justify-content: flex-end;
//   align-items: flex-end;
//   margin-bottom: 15px;
//   transition: all 0.3s ease;
//   transform: scale(0);
//   transform-origin: right;
//   animation-name: showIn;
//   animation-duration: 0.2s; /* or: Xms */
//   animation-iteration-count: 1;
//   animation-direction: normal; /* or: normal */
//   animation-timing-function: cubic-bezier(
//     0.88,
//     0.19,
//     0.37,
//     1.11
//   ); /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */
//   animation-fill-mode: both; /* or: backwards, both, none */
//   animation-delay: 0.2s; /* or: Xms */
// }

// /* @keyframes showIn {
//   0% {
//     transform: scale(0);
//   }
//   100% {
//     transform: scale(1);
//   }
// } */

// .chat__item .avatar {
//   margin-right: 0px;
//   margin-left: 20px;
//   background: #fff;
//   padding: 1px;
// }

// .chat__item__content {
//   background-color: #4462ff;
//   color: #fff;
//   padding: 15px;
//   border-radius: 10px 10px 0 10px;
//   max-width: 50%;
//   min-width: 215px;
// }

// .chat__item__content .chat__meta {
//   justify-content: space-between;
//   display: flex;
//   margin-top: 10px;
// }

// .chat__item__content .chat__meta span {
//   font-size: 14px;
//   color: #8693d3;
//   user-select: none;
// }

// .chat__msg {
//   user-select: none;
// }

// .chat__item.other {
//   flex-direction: row-reverse;
//   transform-origin: left;
// }
// .chat__item.other .chat__item__content {
//   background-color: #fff;
//   color: #000;
//   border-radius: 10px 10px 10px 0;
//   max-width: 50%;
// }

// .chat__item.other .avatar {
//   margin-right: 20px;
//   margin-left: 0px;
// }

// .chat__item.other .chat__item__content .chat__meta span {
//   color: #d1d1d1;
// }

// .content__footer {
//   padding-top: 30px;
// }

// .sendNewMessage {
//   background-color: #ecefff;
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
//   border-radius: 8px;
// }

// .sendNewMessage button {
//   width: 36px;
//   height: 36px;
//   background-color: #ecefff;
//   border: none;
//   box-shadow: none;
//   outline: none;
//   cursor: pointer;
//   font-size: 16px;
//   color: #4665ff;
//   padding: 0;
//   border-radius: 5px;
//   line-height: 36px;
//   transition: all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11);
// }
// .sendNewMessage button:hover {
//   transform: scale(1.2);
// }
// .sendNewMessage button i {
//   display: block;
// }
// .sendNewMessage input {
//   flex-grow: 1;
//   padding: 0 15px;
//   background-color: transparent;
//   border: none;
//   outline: none;
// }
// #sendMsgBtn {
//   background-color: #3b5bfe;
//   color: #fff;
// }

// ` 
// let endPoint = "https://ede7fce1fef2.ngrok.io";

// let socket = io.connect(`${endPoint}`);
 

// function Chatbody({botID, messages, setMessages, getSelectChat}){
//   // const [messages,setMessages] = useState([]);
//   const [message,setMessage] = useState("");
//   const [customerID,setCustomerID] = useState(getSelectChat())
//   // const [userID, setUserID] = useState("");
//   // console.log(getSelectChat())
  


//   useEffect(() =>{
          
//       getMessages();
//   },[messages.length])

//   const getMessages = () =>{
//       socket.on('connect', function (room) {
//           socket.emit('join_room', {
//               bot: botID,
//               customer:customerID
//           })
//       })
      
//       socket.on("message_from_webhook", msg =>{
//           setMessages([...messages,
//               <div className="customer-msg">
//                   <p>{msg.displayName}:{msg.message}</p>
//               </div>]);
//           // setUserID([msg.userID]);
//       })
//       socket.on("message_from_response", msg =>{
//           setMessages([...messages,
//               <div className="owner-msg">
//                   <p>{msg.displayName}:{msg.message}</p>
//               </div>]);
//           // setUserID([msg.userID]);
//       })
//   }

//   const onChange = e => {
//       setMessage(e.target.value);
//   }

//   const onClick = () => {
//       if (message != ""){
//           socket.emit("send_message",{"message": message,"room":botID+'&'+customerID,"customerID":customerID,"botID":botID});
//           setMessage("");
//       }else{
//           alert("Type your message")
//       }
//   }    
//   return(
//         <Styles>
//             <div className="main__chatcontent">
//                     <div className="content__header">
//                         <div className="blocks">
//                             <div className="current-chatting-user">
                      
//                               <p>Tim Hover</p>
//                             </div>
//                         </div>
//                       </div>
//                     <div className="content__body">
//                       <div className="chat__items">
//                       {messages.length > 0 && 
//                         messages.map(msg => (
//                             <div>
//                                 <p>{msg}</p>
//                             </div>
//                       ))}
//                       </div>
//                     </div>
//                     <div className="content__footer">
//                       <div className="sendNewMessage">
//                           <input type="text" value={message} name="message" placeholder="Type a message here" onChange={e => onChange(e)} />
//                           <button className="btnSendMsg" id="sendMsgBtn">
//                               <i className="fa fa-paper-plane" onClick={()=> onClick()} ></i>
//                           </button>
//                       </div>
//                     </div>
//             </div>

//         </Styles>

            
//     );
// }

// export default Chatbody;