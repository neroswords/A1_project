import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Styles = styled.div`

.main-chatlist {
  /* border-right: 1px solid #ebe7fb; */
  padding: 20px 0 0 20px;
  border-right: 1px solid #ebe7fb;
}

.chatlist__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 6%;
}

.btn-nobg {
  background-color: transparent;
  border: none;
  box-shadow: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  color: #dad9dd;
  outline: none;
}

.search_wrap {
  background-color: #e6e5ea;
  border-radius: 5px;
  margin-bottom: 5%;
  margin-right: 8%;
}

.search_wrap input {
  background-color: transparent;
  border: none;
  padding: 15px 15px;
  outline: none;
  width: 80%;
  padding-right: 0;
}

.search-btn {
  height: 46px;
  border: none;
  background-color: transparent;
  outline: none;
  width: 20%;
  cursor: pointer;
  font-size: 20px;
}
.chatlist-msg{
  margin-right: 5%;
}

.chatlist-user{
  /* background-color: #e6e5ea; */
  border-radius: 5px;
  /* font-family: 'Public Sans', sans-serif; */
  margin-top: 2%;
  height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: 4%;
}

.chatlist-user::-webkit-scrollbar-track{
  background-color: #dfdfdfdf;
  border-radius: 10px;
  /* margin-left: 5%; */

}

.chatlist-user::-webkit-scrollbar{
  width: 8px;
  height: 8px;
}

.chatlist-user::-webkit-scrollbar-thumb{
  background-color: rgba(0, 0, 0, 0.4);;
  border-radius: 10px;

}

.user-list{
  background-color : rgba(0, 0, 0, 0.2);
}

.user-list-pic img{
  /* position: absolute; */
  margin-top: 3px;
  /* margin-right: 20px; */
  width: 50px;
  height: 50px;
  /* border: 1px red solid; */
  border-radius: 50%;
  z-index: -1000;
  /* margin-right: 20px; */
  /* position: relative; */
}

.user-list-name{
  /* font-weight: 900; */
  /* padding: 2%; */
}

.msg-user{
  margin: 0 0.1%;
  padding: 5%;
  max-height: 100px;
  display: grid;
  grid-template-columns: 20% 80%;
  /* background-color: aquamarine; */
  /* border-radius: 5px; */
  border-bottom: 1px #dfdfdfdf solid;
}

.msg-user:hover{
  background-color: #F7F7F9;
  /* opacity: 0.3; */
  cursor: pointer;
}

.user-list-text{
  font-family: 'Public Sans', sans-serif;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; 
  /* max-width: 500px;  */
  overflow: hidden;
  /* padding: 2%; */
}

.user-list-input{
  margin: 2%;
}

.connec {
  display: flex;
  margin-top: -15px;
  margin-left: 35px;
  width:15px;
  height: 15px;
  border-radius: 100%;
  background-color: white;
}

.fa-line{
  color: #00B900;
}

.fa-facebook-square{
  color: #1877f2;
}
.tabs{
  display:inline-block;
}
` 
function Chatlist(){
    return(
        <Styles> 
            <div className="chatlist">
                <div className="chatlist_body">
                    <div className="main-chatlist">
                        <div className="chatlist__heading">
                            <h2>Chats</h2>
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
                        <div className="tabs">
                            {/* <div className="tabs-all">
                              All
                            </div>
                            <div className="tabs-facebook">
                              Facebook
                            </div>
                            <div className="tabs-line">
                              line
                            </div> */}
                        </div>
                        <div className="chatlist-user">
                            <div className="chatlist-msg">
                                <li className="msg-user row">
                                    <div className="user-list-pic col-lg-3 col-sm-1">
                                      <img></img>
                                      <div className="connec">
                                        <i className="fab fa-facebook-square"></i>
                                      </div>
                                      
                                    </div>
                                    <div className="user-list-input col">
                                        <h6 className="user-list-name">NAMPUN</h6>
                                        <div className="user-list-text"> 
                                          สวัสดีค่ะ มีสินค้าอะไรบ้างคะ คุยกับบอทแล้วไม่เข้าใจเลยค่ะ อยากเรียกให้ช่วยค่ะ มานี่ๆๆๆๆๆ มานี่มาาาาา
                                        </div>
                                    </div>
                                  </li>
                              </div>

                              <div className="chatlist-msg">
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
                              </div>

                              <div className="chatlist-msg">
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
                              </div>
                              <div className="chatlist-msg">
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
                              </div>
                              <div className="chatlist-msg">
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
                              </div>
                              <div className="chatlist-msg">
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
                              </div>
                              <div className="chatlist-msg">
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
                              </div>
                              <div className="chatlist-msg">
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
                              </div>
                              <div className="chatlist-msg">
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
                              </div>







                        </div>
                    </div>
                </div>
            </div> 
       </Styles>  
    );
}

export default Chatlist;