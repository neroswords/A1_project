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
            ))}
            <input value={message} name="message" onChange={e => onChange(e)} />
            <button onClick={()=> onClick()}>Send</button>
        </div>
    );
}

export default Chat;