import React, { useRef } from "react";
import './Bot_list.css';
import { useDetectOutsideClick } from "./button_nav";


export default function Cardbox() {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return(
                <div class="card-box">
                    <img src='./images/Avatar.jpg' class="bot-img" />
                    <div class="info-bot">
                        <p class="Bot-name">Jessica Le Fleur</p>
                        <div class="divider"></div>
                    </div>
                    <div className="menu-continer">
                        <span onClick={onClick} className="menu-trigger">
                            <li></li>
                            <li></li>
                            <li></li>
                        </span>
                        <div ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`} >
                            <ul>
                                <li>
                                    <a href="./create_bot">edit</a>
                                </li>
                                <li>
                                    <a href="#">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

    );
}
