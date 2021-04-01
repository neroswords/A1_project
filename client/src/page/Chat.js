import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

let endPoint = "http://localhost:200";

let socket = io.connect(`${endPoint}`);

const Styles = styled.div` 
.mapping-page {
    display: flex;
}
.container {
    margin-top:2%
}

` 

function Chat(props){
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");
    const [userID, setUserID] = useState("");

    useEffect(() =>{
        getMessages();
    },[messages.length])

    const getMessages = () =>{
        socket.on("message_from_webhook", msg =>{
            console.log(msg);
            setMessages([...messages,<div><p>{msg.displayName}:{msg.message}</p></div>]);
            // setUserID([msg.userID]);
        })
    }

    const onChange = e => {
        console.log(e.target.value)
        setMessage(e.target.value);
    }

    const onClick = () => {
        if (message != ""){
            socket.emit("send_message_back",message);
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
            ))}
            <input value={message} name="message" onChange={e => onChange(e)} />
            <button onClick={()=> onClick()}>Send</button>
        </div>
    );
}

export default Chat;