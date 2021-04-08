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
    return(
        <Styles>  
        <div className="chat-page">
                <Navbar_member botID = {props.match.params.bot_id} path={"chat"} />
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <ChatList/> 
                    </div>
                    <div className="col">
                    <Chatbody/>  
                    </div>
                </div>
            </div>
        </div>
       </Styles>  
    );
}

export default Chat;