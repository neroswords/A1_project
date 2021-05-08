import React, {useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import '../Components/Botlist/Bot_list.css';
import { useDetectOutsideClick } from "../Components/Botlist/button_nav";
import Delete_pop from "../Components/Delete_pop";
import Connect_bot from "../Page/Connect_bot";
import styled from 'styled-components';

const Styles = styled.div` 
 .loader {
  animation:spin 1s infinite linear;
  border:solid 2vmin transparent;
  border-radius:50%;
  border-right-color:#fca311;
  border-top-color:#fca311;
  box-sizing:border-box;
  height:20vmin;
  left:calc(50% - 10vmin);
  position:fixed;
  top:calc(50% - 10vmin);
  width:20vmin;
  z-index:1;
  &:before {
    animation:spin 2s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcc111;
    border-top-color:#fcc111;
    box-sizing:border-box;
    content:"";
    height:16vmin;
    left:0;
    position:absolute;
    top:0;
    width:16vmin;
  }
  &:after {
    animation:spin 3s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcd111;
    border-top-color:#fcd111;
    box-sizing:border-box;
    content:"";
    height:12vmin;
    left:2vmin;
    position:absolute;
    top:2vmin;
    width:12vmin;
  }
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
`

export default function Bot_list(props) {
    const [botlist,setBotlist] = useState([]);
    const delete_bot =(id)=>{
        fetch('/bot/delete/'+id, {
        method : 'POST',
        headers : {
            "Access-Control-Allow-Origin": "*",
            'Content-Type':'application/json'
            },
        });
        const newList = botlist.filter((bot) => bot._id.$oid !== id);
        
        setBotlist(newList);
    }

    const [showDelete_pop, setShowDelete_pop] = useState(false);
    const [showBotId, setShowBotId] = useState();
    const openDelete_pop = (a) => {
    setShowBotId(a)
    setShowDelete_pop(prev => !prev);
    }
    const [loading,setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [reload, setReload] = useState(false);
    const openForm = (b) => {
    setShowBotId(b)
    setShowForm(prev => !prev);
    }
  

    useEffect(() => {
        fetch('/profile/'+localStorage.getItem('user_id')).then(res => res.json().then(data => {
            setBotlist(data)
            setLoading(true)
      }))
      }, [reload]);
      


 
    const card = botlist.map((bot) => 
  
        <Dropdown botData={bot} deleteBot={delete_bot} openDelete_pop={openDelete_pop} openForm={openForm}/>
    );

    return(
            
                <div className="botlist-page">
                    			{/* <Loader type="Oval" color="#00BFFF" height={50} width={50} secondaryColor="Red" timeout={6000}/> */}
                    <div className="popup-del-connect">
                        <Delete_pop showDelete_pop={showDelete_pop} setShowDelete_pop = {setShowDelete_pop} Delete_bot ={delete_bot} bot={showBotId}></Delete_pop>
                        <Connect_bot showForm={showForm} setShowForm={setShowForm} botID={showBotId} setReload={setReload} ></Connect_bot>
                    </div>

                    {/* <Navbar_member /> */}
                 
                        {loading ?                    
                    
                    <div class="container col-9">
                    <div className="botlist-body" name="bot_list">
                        <Link className='link' to={'/bot/'+localStorage.getItem('user_id')+'/create_bot'} >
                        <div className="card-plus group" name="create-bot">
                            <div>
                                <p>Add new Bot</p>
                            </div>    
                                <div className="icon-plus">
                                    <i class="fas fa-plus"></i>
                                </div>
                        </div>
                        </Link>
                        {/* <div class="card-box"> */}
                         
                                   
       {card}


                        {/* </div> */}

                    </div> 
                    <div className="popup-del-connect">
                        <Delete_pop className="pop-del" showDelete_pop={showDelete_pop} setShowDelete_pop = {setShowDelete_pop} Delete_bot ={delete_bot} bot={showBotId}></Delete_pop>
                        <Connect_bot className="pop-con-mm" showForm={showForm} setShowForm={setShowForm} botID={showBotId} setReload={setReload} ></Connect_bot>
                    </div>


                         </div>
                    : <div class="loader"></div>}

                </div>    
               
        
    );
}

function Dropdown({botData, deleteBot, openDelete_pop, openForm}){
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => {setIsActive(prev => !prev)
    // const [showIdbot, setshowIdbot] = useState(botData._id.$oid);
    // console.log(isActive);
    };
    const OnDelete = () => {
    openDelete_pop(botData._id.$oid)
    onClick()
    }

    // const [showForm, setShowForm] = useState(false);
    // const [showIdbot, setshowIdbot] = useState(botData._id.$oid);
    const OnopenForm = () => {
    openForm(botData._id.$oid)
    onClick()
    }
    

    return(
    <div>
    <div class="card-box">
        <Link to={'/bot/'+botData._id.$oid+'/training' } >
            {/* <p>{botData.Img}</p> */}
            <img src={'/images/bot/bot_pic/'+botData.Img} class="bot-img"/>
        </Link>
        <div class="info-bot">
            <Link className="link" to={'/bot/'+botData._id.$oid+'/training'}>
                <p className="Bot-name">{botData.bot_name}</p>
            </Link>
            <div class="divider"></div>
        </div>
        
        <div className="connect">
        {botData.access_token ? <div className="connect-area line">
                <i class="fab fa-line"></i>
            </div> : <div className="connect-area lineblack">
                 <i class="fab fa-line"></i>
            </div>}

            {botData.page_facebook_access_token ? <div className="connect-area facebook">
                <i class="fab fa-facebook-square"></i>
            </div>
             : <div className="connect-area facebookblack">
                <i class="fab fa-facebook-square"></i>
            </div>
         }
            
        </div>
        <div className="menu-continer">
            <div onClick={onClick} className="menu-trigger">
                <i class="fas fa-ellipsis-v"></i>
            </div>
            <div
                ref={dropdownRef}
                className={`menu ${isActive ? "active" : "inactive"}`}
                >
                <ul>
                    <li> 
                        <a href={'/bot/'+botData._id.$oid+'/edit_bot'}><i class="fas fa-pen"></i> edit</a>
                    </li>
                    <li>
                        <a href="#" onClick={OnopenForm}><i class="fas fa-link"></i> Connect </a>
                    {/* <a href={'/bot/'+botData._id.$oid+'/connect'} ><i class="fas fa-link"></i> Connect</a> */}
                    {/* <Facebookform showForm={showForm} setShowForm={setShowForm} showIdbot={showIdbot}></Facebookform> */}
                    </li>
                    <li>
                        <a href="#" onClick={OnDelete}>
                        <i class="fas fa-trash"></i> Delete</a>
                    </li>
                </ul>
               
            </div>
        </div> 
    </div>
    </div>
    )
}



// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update the state to force render
// }