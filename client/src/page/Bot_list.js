<<<<<<< HEAD
import React, { useRef } from "react";
import Navbar_member from '../components/Navbar/navbar_member';
import '../components/botlist/Bot_list.css';
import { useDetectOutsideClick } from "../components/botlist/button_nav";



export default function Bot_list() {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return(
                <div className="botlist-page">
                    {/* <Navbar_member /> */}
                          <div class="container col-xl-9 col-lg-9 col-md-12  col-sm-12 col-xs-12">
                                    <div className="botlist-body">
                                        <div className="card-plus group">
                                            <div>
                                                <p>Add new Bot</p>
                                            </div>    
                                                <div className="icon-plus">
                                                    <i class="fas fa-plus"></i>
                                                </div>
                                        </div>

                                        <div class="card-box">
                                            <img src='./images/Avatar.jpg' class="bot-img" />
                                            <div class="info-bot">
                                                <p class="Bot-name">Jessica Le Fleur</p>
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
                                                        <a href="./create_bot"><i class="fas fa-pen"></i> edit</a>
                                                        </li>
                                                        <li>
                                                        <a href="#"><i class="fas fa-link"></i> Connect</a>
                                                        </li>
                                                        <li>
                                                        <a href="#"><i class="fas fa-trash"></i> Delete</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                             </div>
                                        </div>

                                    </div> 
                        </div>
                </div>    
               
        
    );
}
=======
import React, { useState, useEffect }from 'react';

function Bot_list (props){
    
    const [botData,setBotData] = useState([])
    useEffect(()=>{
        fetch('/profile/'+props.match.params.user_id).then(
          response => response.json()
        ).then(data => setBotData(data))
      }, []);
    
        return(
            <div>
                { botData }
                hi this is {props.match.params.user_id}
            </div>  
        )
}

export default Bot_list;
>>>>>>> 0ce54616ea77dbbad8aefad742cd581b66750271
