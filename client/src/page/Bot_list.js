import React, {useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import '../Components/Botlist/Bot_list.css';
import { useDetectOutsideClick } from "../Components/Botlist/button_nav";
import DeleteModal from '../Components/delete_modal'

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

    useEffect(async () => {
        fetch('/profile/'+localStorage.getItem('user_id')).then(res => res.json().then(data => setBotlist(data)))
    },[])

    const card = botlist.map((bot) => 
        <Dropdown botData={bot} deleteBot={delete_bot} />
    );

    return(
                <div className="botlist-page">
                    {/* <Navbar_member /> */}
                          <div class="container col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12">
                                    <div className="botlist-body">
                                        <Link className='link' to={'/bot/'+localStorage.getItem('user_id')+'/create_bot'}>
                                        <div className="card-plus group">
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
                        </div>
                </div>    
               
        
    );
}

function Dropdown({botData, deleteBot}){
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    // const forceUpdate = useForceUpdate();
    // console.log(botData)
    
    // const [showConnect, setShowConnect] = useState(false);
    // const openConnect = () => {
    //     setShowConnect(prev => !prev);
    //   }

    return(
    <div class="card-box">
        <Link to={'/bot/'+botData._id.$oid+'/training' } >
            <img src={'/images/bot/bot_pic/'+botData.Img} class="bot-img"/>
        </Link>
        <div class="info-bot">
            <Link className="link" to={'/bot/'+botData._id.$oid+'/training'}>
                <p class="Bot-name">{botData.bot_name}</p>
            </Link>
            <div class="divider"></div>
        </div>
        <div className="connect">
            <div className="connect-area line">
                <i class="fab fa-line"></i>
            </div>
            <div className="connect-area facebook">
                <i class="fab fa-facebook-square"></i>
            </div>
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
                    <a href={'/bot/'+botData._id.$oid+'/connect'}><i class="fas fa-link"></i> Connect</a>
                    {/* <Connect showConnect={showConnect} setShowConnect={setShowConnect} /> */}
                    </li>
                    <li>
                        <a href="#" onClick={()=>deleteBot(botData._id.$oid)}>
                        <i class="fas fa-trash"></i> Delete</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update the state to force render
// }