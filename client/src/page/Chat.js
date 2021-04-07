import React, { useEffect, useState } from 'react';
import Navbar_member from '../Components/Navbar/navbar_member';
import Chatbody from '../Components/Chat/chatbody';
import ChatList from '../Components/Chat/chatlist';
import styled from 'styled-components';

const Styles = styled.div` 
.chat-page {
    display: flex;
    min-height: 92vh;
}
.chat-page .container {
    /* margin-bottom: 2%; */
    margin-top: 2%;
    overflow:hidden;
    background-color: #ffffff;
}

` 
function Chat(props){
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");
    // const [userID, setUserID] = useState("");

    useEffect(() =>{
        fetch('/bot/'+props.match.params.bot_id+'/customer/'+props.match.params.customer_id, ).then(res=> res.json().then(data=> 
                data.message.forEach(ele=>{ setMessages(messages=> [...messages,<div><p>{ele.sender}:{ele.message}</p></div>])
            })
        ))
    },[])

    useEffect(() =>{
            
        getMessages();
    },[messages.length])

    const getMessages = () =>{
        socket.on('connect', function (room) {
            socket.emit('join_room', {
                bot: props.match.params.bot_id,
                customer: props.match.params.customer_id
            })
        })
        
        socket.on("message_from_webhook", msg =>{
            setMessages([...messages,<div><p>{msg.displayName}:{msg.message}</p></div>]);
            // setUserID([msg.userID]);
        })
        socket.on("message_from_response", msg =>{
            setMessages([...messages,<div><p>{msg.displayName}:{msg.message}</p></div>]);
            // setUserID([msg.userID]);
        })
    }

    const onChange = e => {
        setMessage(e.target.value);
    }

    const onClick = () => {
        if (message != ""){
            socket.emit("send_message",{"message": message,"room":props.match.params.bot_id+'&'+props.match.params.customer_id,"customerID":props.match.params.customer_id,"botID":props.match.params.bot_id});
            setMessage("");
        }else{
            alert("Type your message")
        }
    }
    return(   
        <div>
            {messages.length > 0 && 
            messages.map(msg => (
                <div>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
       </Styles>  
    );
}

export default Chat;