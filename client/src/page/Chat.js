import React, { useEffect, useState } from 'react';
import Navbar_member from '../Components/Navbar/navbar_member';
import Chatbody from '../Components/Chat/Chatbody';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

function Chat(props){
    const [customerList, setCustomerList] =  useState([])
    const [customer, setCustomer] =  useState(props.match.params.customer_id)

    useEffect(() => {
        setCustomer(props.match.params.customer_id);
      }, [props.match.params.customer_id]);

    useEffect(() =>{
      fetch('/bot/'+props.match.params.bot_id+'/customer').then(res=> res.json().then(data=> setCustomerList(data)
      ))
      
    },[])

    return(
        
            <div className="chat-page">
                    <Navbar_member botID = {props.match.params.bot_id} path={"chat"} />
                <div className="container">
                    <div className="main-chatlist row">
                
                        <div className="main-chatlist col-4">
                            <div className="chatlist__heading">
                                <h2 id="chat-header">Chats</h2>
                                <button className="btn-nobg">
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                            </div>
                            <div className="chatList__search">
                                <div className="search_wrap">
                                    <input type="text" placeholder="Search Here" required />
                                    <button className="search-btn">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            {/* <div className="tabs">
                                <div className="tabs-all">
                                All
                                </div>
                                <div className="tabs-facebook">
                                Facebook
                                </div>
                                <div className="tabs-line">
                                line
                                </div>
                            </div> */}
                            <div className="chatlist-user">
                                { customerList.map((customer) => (
                                    
                                    <Link to={"/chat/"+ props.match.params.bot_id+"/live_chat/"+customer.userID} className="chatlist-msg">
                                        <li className={"msg-user row " + (props.match.params.customer_id == customer.userID ? "select-user-list":"")}>
                                            <div className="user-list-pic col-lg-3 col-sm-1">
                                                <img src={customer.pictureUrl}></img>
                                                {   customer.type == "lineUser" ?
                                                    (            
                                                    <div className="connec">
                                                        <i className="fab fa-line"></i>
                                                    </div>
                                                    ) : (
                                                    <div className="connec">
                                                        <i className="fab fa-facebook-square"></i>
                                                    </div>    
                                                    )
                                                }
                                                
                                                </div>
                                            <div className="user-list-input col">
                                                <h6 className="user-list-name">{customer.display_name}</h6>
                                                <div className="user-list-text"> 
                                                    {/* สวัสดีค่ะ มีสินค้าอะไรบ้างคะ คุยกับบอทแล้วไม่เข้าใจเลยค่ะ อยากเรียกให้ช่วยค่ะ มานี่ๆๆๆๆๆ มานี่มาาาาา */}
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                    
                                    ))
                                }
                                </div>
                            </div>
                              {/* <div className="chatlist-msg">
                                  <li className="msg-user row">
                                      <div className="user-list-pic col-lg-3 col-sm-1">
                                        <img></img>
                                        <div className="connec">
                                          <i className="fab fa-line"></i>
                                        </div>
                                      </div>
                                      <div className="user-list-input col">
                                          <h6 className="user-list-name">NAMPUN</h6>
                                          <div className="user-list-text"> 
                                            สวัสดีค่ะ มีสินค้าอะไรบ้างคะ คุยกับบอทแล้วไม่เข้าใจเลยค่ะ อยากเรียกให้ช่วยค่ะ มานี่ๆๆๆๆๆ มานี่มาาาาา
                                          </div>
                                      </div>
                                  </li>
                              </div> */}
                            <div className="col">
                                <Chatbody botID={props.match.params.bot_id} customerID={props.match.params.customer_id} />
                            </div> 
                        </div>
                    </div>
                    
                
            </div> 
        
    )

    // const [messages,setMessages] = useState([]);
    // const [message,setMessage] = useState("");
    // // const [userID, setUserID] = useState("");

    // useEffect(() =>{
    //     fetch('/bot/'+props.match.params.bot_id+'/customer/'+props.match.params.customer_id, ).then(res=> res.json().then(data=> 
    //             data.message.forEach(ele=>{ setMessages(messages=> [...messages,<div><p>{ele.sender}:{ele.message}</p></div>])
    //         })
    //     ))
    // },[])

    // useEffect(() =>{
            
    //     getMessages();
    // },[messages.length])

    // const getMessages = () =>{
    //     socket.on('connect', function (room) {
    //         socket.emit('join_room', {
    //             bot: props.match.params.bot_id,
    //             customer: props.match.params.customer_id
    //         })
    //     })
        
    //     socket.on("message_from_webhook", msg =>{
    //         setMessages([...messages,<div><p>{msg.displayName}:{msg.message}</p></div>]);
    //         // setUserID([msg.userID]);
    //     })
    //     socket.on("message_from_response", msg =>{
    //         setMessages([...messages,<div><p>{msg.displayName}:{msg.message}</p></div>]);
    //         // setUserID([msg.userID]);
    //     })
    // }

    // const onChange = e => {
    //     setMessage(e.target.value);
    // }

    // const onClick = () => {
    //     if (message != ""){
    //         socket.emit("send_message",{"message": message,"room":props.match.params.bot_id+'&'+props.match.params.customer_id,"customerID":props.match.params.customer_id,"botID":props.match.params.bot_id});
    //         setMessage("");
    //     }else{
    //         alert("Type your message")
    //     }
    // }
    // return(   
    //     <div>
    //         {messages.length > 0 && 
    //         messages.map(msg => (
    //             <div>
    //                 <p>{msg}</p>
    //             </div>
    //         ))}
    //         <input value={message} name="message" onChange={e => onChange(e)} />
    //         <button onClick={()=> onClick()}>Send</button>
    //     </div>
    // );
}

export default Chat;