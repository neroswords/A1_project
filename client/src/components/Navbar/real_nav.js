import "./real_nav.css";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { Link } from "react-router-dom";
import { isLoggedIn, deleteTokens } from "../auth";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import io from "socket.io-client";
import { Provider, useSelector, useDispatch } from "react-redux";
import { mergeStyles } from "react-select";
import { useDetectOutsideClick } from "../Botlist/button_nav";
import CommunicationInvertColorsOff from "material-ui/svg-icons/communication/invert-colors-off";
import { Info } from "material-ui-icons";
import { Redirect } from 'react-router';
// import Notifier from "react-desktop-notification"

let endPoint = "http://127.0.0.1:300";
let socket = io.connect(`${endPoint}`);
let flag = false
let flag2 = false
let nofy = false
function Nav() {
  if (isLoggedIn()) {
    return Loged_in_nav(localStorage.getItem("username"));
  } else {
    return Normal_nav();
  }
}
function Normal_nav() {
  return (
    <Navbar_real>
      {/* <Link to="#">
          <div className="btn-login btn-nav">
              <a className="btn" role="button" name="btn-home">Home</a>
          </div>
      </Link> */}
      {/* <Link to="#">
          <div className="btn-login btn-nav">
              <a className="btn" role="button">ABOUT</a>
          </div>
      </Link> */}
     
      {/* <Link to="/login">
          <div className="btn-login btn-nav">
              <a className="btn" role="button" name="login">Log in</a>
          </div>
      </Link> */}
      <Link to="/register">
        <div className="btn-signup btn-nav">
          <a className="btn" role="button" name="btn-regist">
            Register
          </a>
        </div>
      </Link>
      <Link to="/login">
        <div className="btn-login btn-nav">
          <a className="btn" role="button">
            Log in
          </a>
        </div>
      </Link>
    </Navbar_real>
  );
}

function Loged_in_nav(props) {
  const [main, setMain] = useState(window.location.hash);

  return (
    <Navbar_real>
      <div
        className={"show-user " + (main == "#main" ? "click-show-user" : "")}
      >
        <a name="validate-user" 
          className="click"
          href={"/bot_list/" + localStorage.getItem("user_id") + "#main"}
        >
          <i class="fas fa-user-circle"></i>
          {props}
        </a>
      </div>

      <NavItem flag = {false}icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
      
    </Navbar_real>
  );
}

function Navbar_real(props) {
  return (
    <nav className="navbar-real">
      <a href="/">
        <img href="/" src="/images/logo6.PNG" className="nav_brand" />
      </a>
      <ul className="navbar-nav-real">{props.children}</ul>
    </nav>
  );
}

 function NavItem(props,) {

  let numno = 0
  let list = []
  let alllist = []
  const [noti, setNoti] = useState();
  const [name, setName] = useState();
  const [shownoti, setShownoti] = useState([]);
  const [info, setInfo] = useState([]);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
   const onClick =  () => {
    setIsActive(prev => !prev)
    // let count = 0
    //  fetch("/profile/" + localStorage.getItem("user_id") + "/notification", {
    //   method: "POST",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    //   body : 0
    // })
    //   console.log("DOIT")
    // ,count = 0
    // ,flag2 = false
    // ,setNoti(" ")
    // ,console.log("count= ",count)
    // ,console.log("flag= ",flag2)
    // ,console.log("state= ",noti)
     

  };

  const OnopenForm = () => {
    // openForm(botData._id.$oid)
    onClick()
    }
    


  const [open, setOpen] = useState(false);
  const [opennoti, setOpennoti] = useState(false);
  const [callnumber, setCallnumber] = useState(false);

  useEffect(() => {
    getNoti()
  }, [info.length]);
  
useEffect(() => {

    getUpdate()

  }, [opennoti]);

  useEffect(() => {  //data
    fetch('/profile/' + localStorage.getItem("user_id") + '/notification/get')
    .then(response => response.json().then(inf => {
        setInfo(inf)
        setOpennoti(prev => !prev)
    }))
  
  }, []);

  useEffect(() => {
    fetch('/profile/' + localStorage.getItem("user_id") + '/notification')
    .then(res => res.json().then(data => { if (data != 0) {
            setNoti(data)}
        else {
          setNoti("")
        }
        }))
  },[callnumber]);

  // console.log(data)

  const getNoti = () => {

    // let audio = new Audio("/test.mp3")
    socket.on("connect", function (room) {
      socket.emit("join_room_noti", {
        userID: localStorage.getItem("user_id"),
      });
      });

    socket.on("message_from_noti", msg =>{  
        console.log("1")
        console.log(msg)
        let newList = info.filter((elements) => ((elements.sender_id != msg.sender_id) && (elements.botID.$oid != msg.botID)));
        newList.unshift(msg)
      
        let count = 0;
        newList.map(i =>{
            if(i.readed == "unread")
            {
              count = count+1
              // nofy = true
            }
          })
          
        setNoti(count)
        setInfo(newList)
        setOpennoti(prev => !prev)
        // if (!audio.isPlaying && nofy == true)
        // {
        //     audio.play();
        //     nofy = false
        // }
        // if (nofy == true){
        //   Notifier.start("Message from",msg['message'],"www.google.com","validated image url");
        //   nofy = false
        //   }
        // if(flag == false){
        //     setCallnumber(prev => !prev)
        //     flag = true
        // }
     

  })

  
 
  }

  const getUpdate =() =>{

    setShownoti(info.map(msg => (
      
        <li> 
<<<<<<< HEAD
               
                <div className={msg['readed'] == "read"? 'msg-noti-iread': "msg-noti-i"} onClick={()=>toggleClass(msg)} > 
                  {/* <div className={isActiveClass ? 'img-noti-i': 'img-noti-inew'} onClick={toggleClass(this)} > */}
                  <div className="msg-noti-all">
                      <div className="noti-show-img-and-type">
                        <img className="noti-show-img" src={msg['pictureUrl']}></img>
                        <div className="noti-show-user-type">
                          {   msg.sender_type == "line" ||  msg.sender_type == "lineUser" ?
                                (            
                                  <div className="noti-show-line">
                                      <i className="fab fa-line"></i>
                                        
                                  </div>
                                ) : (
                                  <div className="noti-show-facebook">
                                      <i className="fab fa-facebook-square"></i>
                                      
                                  </div>    
                                )
                          }
                          </div>
                        </div> 
                        {console.log(msg)}
                        <Link className="noti-show-info-user" to={"/chat/"+msg['botID']['$oid']+"/live_chat/"+msg['sender_id']}  >
                       
                            {msg['readed'] == "unread"? <div className="noti-show-new"><p>NEW</p></div>: " "}
                            <p className="noti-show-name">{msg['sender']}</p>  
                            <p className="noti-show-msg">{msg['message']}</p>
                            <p className="noti-show-bot">{msg['bot_name']}</p>
                            {/* {msg['message']} {msg['botID']['$oid']} */}
                        
                        </Link>
                      </div>
                    </div>
                   
=======
               {/* <Redirect className="msg-noti-all" to={"/chat/"+msg['botID']['$oid']+"/live_chat/"+msg['sender_id']} > */}
              
               <div className={msg['readed'] == "read"? 'msg-noti-iread': "msg-noti-i"} onClick={()=>toggleClass(msg)} > 
                {/* <div className={isActiveClass ? 'img-noti-i': 'img-noti-inew'} onClick={toggleClass(this)} > */}
                <div className="msg-noti-all">
                    <div className="noti-show-img-and-type">
                      <img className="noti-show-img" src={msg['pictureUrl']}></img>
                      <div className="noti-show-user-type">
                        {   msg.sender_type == "line" ||  msg.sender_type == "lineUser" ?
                              (            
                                <div className="noti-show-line">
                                    <i className="fab fa-line"></i>
                                      
                                </div>
                              ) : (
                                <div className="noti-show-facebook">
                                    <i className="fab fa-facebook-square"></i>
                                    
                                </div>    
                              )
                        }
                        </div>
                      </div> 
  
                      <Link className="noti-show-info-user" to={"/chat/"+msg['botID']['$oid']+"/live_chat/"+msg['sender_id']}  >
                        {msg['readed'] == "unread"? <div className="noti-show-new"><p>NEW</p></div>: " "}
                        <p className="noti-show-name">{msg['sender']}</p>  
                        <p className="noti-show-msg">{msg['message']}</p>
                        <p className="noti-show-bot">{msg['bot_name']}</p>
                        {/* {msg['message']} {msg['botID']['$oid']} */}
                      </Link>
                    </div>
                  </div>
                  {/* </Redirect> */}
                 
>>>>>>> 8291a66bac2d7a0a24993be7349a78c6d604eabe
                
            </li>
          
            )
   )
   
   )

    flag = false    
 
  }

  const toggleClass = (msg) => {
    // setIsActive(prev => !prev)
    // console.log("nampun")
    // for (var i in msg) {
      console.log("/profile/" + localStorage.getItem("user_id") + "/notification/get")
      msg['readed'] = "read"
       fetch("/profile/" + localStorage.getItem("user_id") + "/notification/get", {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body : JSON.stringify(msg)
          
        }).then((response) => {
          response.json().then((body) => {
            setCallnumber(prev => !prev)
          });
        }).then(getUpdate());
       


      // if (shownoti[i].sender_id == msg.sender_id) {
      //   shownoti[i].readed = "readed";
      //   // fetch("/profile/" + localStorage.getItem("user_id") + "/notification/get", {
      //   //   method: "POST",
      //   //   headers: {
      //   //     "Access-Control-Allow-Origin": "*",
      //   //     "Content-Type": "application/json",
      //   //   },
      //   //   body : msg._id
      //   // })
      //    break; //Stop this loop, we found it!
      // }
    //}
    // window.location.href = "/chat/"+msg['botID']['$oid']+"/live_chat/"+msg['sender_id']
    
  };
  return (
    
    <li className="nav-item-real">
            
            <div onClick={onClick} className="menu-trigger-noti">
              <i class="fas fa-comments-alt"></i>
            </div>
              <div className="number-noti"><p className="show-number">{noti}</p></div>
            <div
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
                >
                  <div className="dropdown-noti">
                <ul>
                <p>Chat Notification</p>
                {shownoti.length > 0 && 
                          shownoti.map(msg => (
                            <p className="noti-each-msg">{msg}</p>
                            
                        ))}
            
                    
                    <li>
                        {/* <a onClick={OnopenForm}><i class="fas fa-link"></i> Connect </a> */}
                    {/* <a href={'/bot/'+botData._id.$oid+'/connect'} ><i class="fas fa-link"></i> Connect</a> */}
                    {/* <Facebookform showForm={showForm} setShowForm={setShowForm} showIdbot={showIdbot}></Facebookform> */}
                    </li>
                    
                </ul>
                </div> 
          </div>  
          
        
      {/* <a href="#" className="icon-button-real" name="user-dropdown" onClick={() => setOpennoti(!open)}>
        <i class="far fa-bells">{noti}
      </i>
              </a> */}

      <a
        href="#"
        className="icon-button-real"
        name="user-dropdown"
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
  }

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [username, setUsername] = useState(localStorage.getItem("user_id"));
  const dropdownRef = useRef(null);

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item-real"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button-real">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right-real">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown-real" ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="menu-real">
          {/* <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Animals
          </DropdownItem> */}
          <a
            name="user-edit"
            onClick={() => {
              window.location.replace(
                "/profile/" + localStorage.getItem("user_id") + "/edit"
              );
            }}
          >
            <DropdownItem leftIcon={<i class="fas fa-user"></i>}>
              Edit Profile
            </DropdownItem>
          </a>
          <a
            name="user-manage"
            onClick={() => {
              window.location.replace(
                "/bot_list/" + localStorage.getItem("user_id")
              );
            }}
          >
            <DropdownItem leftIcon={<i class="fas fa-robot"></i>}>
              Manage Bot
            </DropdownItem>
          </a>

          {/* <a
            onClick={() => {
              window.location.replace("/manual");
            }}
          >
            <DropdownItem leftIcon={<i class="fas fa-book-open"></i>}>
              Manual
            </DropdownItem>
          </a> */}
          <a
            name="signout"
            onClick={() => {
              deleteTokens();
              window.location.replace("/");
            }}
          >
            <DropdownItem
              leftIcon={<i className="fas fa-sign-out-alt signout-icon"></i>}
            >
              SIGN OUT
            </DropdownItem>
          </a>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Nav;