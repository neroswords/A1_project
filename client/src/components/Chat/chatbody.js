import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client'
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import '../Chat/Chat.css';

let endPoint = "http://127.0.0.1:300";

let socket = io.connect(`${endPoint}`);
 


function Chatbody({botID,customerID}){
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");
    const [username, setUsername] = useState("");
    const messagesEndRef = useRef(null);
    const [auto, setAuto] = useState();

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    } 

    const switched =()=>{
      setAuto(prev => !prev)
      fetch('/bot/'+botID+'/customer/'+customerID,{
        method: 'POST',
          headers : {
          //   "Access-Control-Allow-Origin": "*",
            'Content-Type':'application/json'
          },
          body : JSON.stringify({"auto_chat":auto}),
      })
    }
    console.log(auto)
    useEffect(() =>{
        if (customerID !=="main"){
            join_room()
            setMessages([])
            fetch('/bot/'+botID+'/customer/'+customerID).then(res=> res.json().then(data=>{
                setAuto(!data.profile.auto_chat)
                setUsername(data.profile.display_name);
                data.message.forEach(ele=>{ 
                  if (ele.sender_type == "bot"){
                    setMessages(messages=> [...messages,<div><p className="head-name from-owner msg">{ele.sender}</p><p className="msg owner-send">{ele.message}</p></div>])
                  } else if (ele.sender_type == "line"){
                    setMessages(messages=> [...messages,<div><p className="head-name from-cust msg">{ele.sender}</p><p className="msg customer-send">{ele.message}</p></div>])
                  }
                    else if (ele.sender_type == "facebook"){
                    setMessages(messages=> [...messages,<div><p className="head-name from-cust msg">{ele.sender}</p><p className="msg customer-send">{ele.message}</p></div>])
                  }
            })
          }))
        }
        scrollToBottom()
    },[customerID])

    
    useEffect(() =>{
        getMessages();
        
    },[messages.length])

    const join_room = () =>{
      socket.on('connect', function (room) {
        socket.emit('join_room', {
            bot: botID,
            customer:customerID
        })
    })
    }
    
    

    const getMessages = () =>{
      socket.on("message_from_webhook", msg =>{
          setMessages([...messages,
              <div >
                  <p className="head-name from-cust msg">{msg.sender}</p><p className="msg customer-send">{msg.message}</p>
              </div>]);
              scrollToBottom()
          // setUserID([msg.userID]);
      })
   
      socket.on("message_from_response", msg =>{
          console.log(msg)
          setMessages([...messages,
              <div >
                  <p className="head-name from-owner msg">{msg.sender}</p><p className="msg owner-send">{msg.message}</p>
              </div>]);
              
          
          // setUserID([msg.userID]);
      })

   
  }
  
    const onChange = e => {
      setMessage(e.target.value);
    }

    const onClick = () => {
      if (message != ""){
          socket.emit("send_message",{"message": message,"room":botID+'&'+customerID,"customerID":customerID,"botID":botID});
          setMessage("");
      }else{
          alert("Type your message")
      }
    }    
    return(

            <div className="main__chatcontent">
                    <div className="content__header">
                        <div className="blocks">
                            <div className="current-chatting-user">
                              <p>{username}</p>
                            </div>
                            
                            <div class="toggle">
                              <input type="checkbox" onClick={()=>{switched()}} class="check" checked={!auto ?("checked"):("")}/>
                              <b class="b switch"></b>
                              <b class="b track"></b>
                            </div>
                        </div>
                      </div>
                    <div className="content__body">
  
                    {messages.length > 0 && 
                          messages.map(msg => (
                             <div className="chat__item ">
                                  <p className="msg-all">{msg}</p>
                            </div>  
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                      
                    
                    
                    <div className="content__footer">
                      <div className="sendNewMessage">
                          <input type="text" value={message} name="message" placeholder="Type a message here" onChange={e => onChange(e)} />
                          <button className="btnSendMsg" id="sendMsgBtn">
                              <i className="fa fa-paper-plane" onClick={()=> onClick()} ></i>
                          </button>
                      </div>
                    </div>
            </div>

    

            
    );
}
const MemoizedItem = React.memo(Chatbody, () => true)
export default Chatbody;
