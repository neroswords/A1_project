import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {createStore} from 'redux'
import tReducers from '../../Reducers/tReducers'
import {connect} from 'react-redux'
import { Provider,useSelector,useDispatch} from 'react-redux';
// const store = createStore(tReducers,+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const Styles = styled.div` 
  .navbar-c {
    position: relative;
    background-color: #000000;
    transition: width 600ms ease;
    overflow: hidden;
    height: 100%;
    width: 100%;
    
  }
  
  .navbar-nav-c {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .nav-item-c {
    width: 100%;
  }

  .nav-link-c {
    display: flex;
    align-items: center;
    height: 3.25rem;
    color: yellow;
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: 200ms;;
  }
  
  .nav-link-c:hover {
    filter: grayscale(0%) opacity(1);
  }
  
  .nav-link-c i {
    font-size: 18px;
    /* min-width: rem; */
    margin: 0 1rem;
  }
  
  .fa-primary {
    color: #000000;
  }

  .fa-secondary {
    color: #fca311;
  }
  
  .fa-primary,
  .fa-secondary {
    transition: 200ms;
  }

  

  @media only screen and (min-width: 600px) {
    .navbar-c {
      top: 0;
      width:  4rem;
      height: 100%;
    }
    /* .navbar2 {
      top: 0;
      width: 5rem;
      height: 100%;
    } */
  }

  //////////////////////////////////////////
  .navbar2 {
    position: relative;
    background-color: #000000;
    transition: width 600ms ease;
    overflow: hidden;
    height: 100%;
    width: 100%;
    /* margin-right : 2rem; */
  }
  
  .navbar-nav2 {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* margin-right : 2rem; */
  }
  
  .nav-item2 {
    width: 100%;
  }
  
  .nav-link2 {
    display: flex;
    align-items: center;
    height: 3.25rem;
    color: yellow;
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: 200ms;
  }
  
  .nav-link2:hover {
    filter: grayscale(0%) opacity(1);
    color: white;
  }
  
  
  .nav-link2 i {
    font-size: 18px;
    /* font-weight */
    min-width: 2rem;
    margin: 0 1rem;
  }
  
  
  /* Large screens */
  /* @media only screen and (min-width: 600px) {
    .navbar2 {
      top: 0;
      width: 14rem;
      height: 100%;
    }
  
  } */
  
  .navbar2 span{
    font-weight: bold;
    // margin-left: 15%;
  }

  .btn-nav{
    margin-top:16px;
    display: flex;
    align-items: center;
    /* color: #fca311; */
    text-decoration: none;
    font-size: 18px;
  }

  .btn-nav-open i {
    width: 4rem;
    transform: rotate(0deg);
    transition: 500ms;
  }

  .btn-nav-close {
    color: #fca311;
    text-align: right;
    margin-right: 1.5rem;
    width: 11.5rem;
  }

  .btn-nav-open i{
    transform:  rotateY(0deg);
    transition: 300ms;
  } 

  .btn-nav-open i:hover {
    transform:  rotateY(150deg);
    /* transition: 500ms; */
  }

  .btn-nav-close i{
    transform:  rotateY(0deg);
    transition: 300ms;
  }

  .btn-nav-close i:hover{
    transform:  rotateY(150deg);
    /* transition: 500ms; */
  }
  
.nav-check {
  display: flex;
    align-items: center;
    height: 3.25rem;
    text-decoration: none;
    /* color: #fca311; */
    transition: 200ms;
    border-left: 4px solid #fafafa;
    border-radius: 5%;
    background-color : #242424;
  }
  
.nav-check i {
    color: #fca311;
    /* filter: grayscale(100%) opacity(0.7); */
    font-size: 18px;
    /* font-weight */
    padding: 10%;
    min-width: 2rem;
    margin: 0 0.5rem;
    /* backdrop-filter: blur(10px); */
  }

  .nav-check-open {
    display: flex;
    align-items: center;
    height: 3.25rem;
    text-decoration: none;
    transition: 200ms;
    background-color : #242424;
    border-radius: 5%;
    border-left: 4px solid #fafafa;
    /* backdrop-filter: opacity(30%); */
    /* backdrop-filter: blur(10px); */

  }

  .nav-check-open i {
    font-size: 18px;
    /* font-weight */
    min-width: 2rem;
    margin: 0 1rem;
  }

  .nav-check-open span {
    color: white;
    /* filter: grayscale(100%) opacity(0.7); */

  }

`;

function Navbar_member({ botID, customer_id, path  }) {
  const stetus = useSelector(state => state.tr)
  const [change, setchange] = useState(stetus);
  // setchange(ichange)
  const dispatch = useDispatch()
  // const stetus = useSelector(state => state.auth)
  const Change = (e) => {
    if (change == true) {
      setchange(false);
    } else if (change == false){
      setchange(true);
    }
  };
  // const testChange = (e) => {
  //   e.preventDefault();
  // }
  const onSubmit = () =>{
    
    dispatch({
      type : "testcase",
      change : change
    })
  }


  return (
    <Styles>
      {change ? (
        <nav className="navbar-c" >
          <ul className="navbar-nav-c" >
            <li className="btn-nav" >
              <Link onClick={Change} className="btn-nav-open" > 
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="fas fa-angle-double-right"></i> 
                      </div>
                  </div>
              </Link>
            </li>

            <li className="nav-item-c">
            { path=="training" ? ( 
              <Link to={"/bot/" + botID + "/training"} onClick={onSubmit} class="nav-check">
                  <div className="fa-group">
                    <div className="fa-secondary">
                    <i class="fas fa-robot"></i>
                    </div>
                  </div>
              </Link> ) : (
                <Link to={"/bot/" + botID + "/training"} onClick={onSubmit} class="nav-link-c">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i class="far fa-robot"></i>
                  </div>
                </div>
            </Link>
              )
            }
            </li>

            <li className="nav-item-c">
            { path=="trained" ? ( 
              <Link to={"/bot/" + botID + "/trained"}  onClick={onSubmit} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/trained"}  onClick={onSubmit} class="nav-link-c">
                  <div className="fa-group">
                       <div className="fa-secondary">
                          <i className="far fa-graduation-cap"></i>
                        </div>
                  </div>
              </Link>
              ) 
            }
            </li>

            <li className="nav-item-c">
            { path=="group" ? (
              <Link to={"/bot/" + botID + "/group"} onClick={onSubmit} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-object-group"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/group"} onClick={onSubmit} class="nav-link-c">
                    <div className="fa-group">
                        <div className="fa-secondary">
                            <i className="far fa-object-group"></i>
                        </div>
                    </div>
              </Link>
              ) 
            }
            </li>

         
            <li className="nav-item-c">
            { path=="mapping" ? (
              <Link to={"/bot/" + botID + "/mapping"} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/mapping"} class="nav-link-c">
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="far fa-project-diagram"></i>
                      </div>
                  </div>
                </Link>
              )
            }
            </li>
            
            
            <li className="nav-item-c">
            { path=="history" ? (
              <Link to={"/bot/" + botID + "/history"} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-history"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/history"} class="nav-link-c">
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="far fa-history"></i>
                      </div>
                  </div>
                </Link>
              )
            }
            </li>


            <li className="nav-item-c">
            { path=="inventory" ? (
              <Link to={"/bot/" + botID + "/inventory"} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-box-open"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/inventory"} class="nav-link-c">
                  <div className="fa-group">
                      <div className="fa-secondary">
                        <i className="far fa-box-open"></i>
                      </div>
                  </div>
                </Link>
              )
            }
            </li>

            <li className="nav-item-c">
            { path=="customer_infomation" ? (
              <Link to={"/bot/" + botID + "/customer_infomation"} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-address-book"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/customer_infomation"} class="nav-link-c">
               <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="far fa-address-book"></i>
                  </div>
                </div>
                </Link>
              )
            }
            </li>

            <li className="nav-item-c">
            { path=="chat" ? (
              <Link to={"/chat/" + botID + "/live_chat/main"} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                  <i className="fas fa-comments-alt"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/chat/" + botID + "/live_chat/main"} class="nav-link-c">
               <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="far fa-comments-alt"></i>
                  </div>
                </div>
                </Link>
              )
            }
            </li>

            <li className="nav-item-c">
            { path=="dashboard" ? (
              <Link to={"/bot/" + botID + "/customer_infomation"} class="nav-check">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-user-chart"></i>
                  </div>
                </div>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/dashboard"} class="nav-link-c">
               <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="far fa-user-chart"></i>
                  </div>
                </div>
                </Link>
              )
            }
            </li>


          </ul>
        </nav>

      ) : (

        <nav className="navbar2">
          <ul className="navbar-nav2" id="left-navbar">
            <li className="btn-nav">
              
              <Link onClick={Change} className="btn-nav-close">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-angle-double-left"></i>
                  </div>
                </div>
              </Link>
            </li>

            <li className="nav-item2">
            { path=="training" ? (
              <Link to={"/bot/" + botID + "/training"} onClick={onSubmit} class="nav-check-open" name="menu-training">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-robot"></i>
                  </div>
                </div>
                <span className="link-text">Training bot</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/training"} onClick={onSubmit} class="nav-link2" name="menu-training">
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="far fa-robot"></i>
                      </div>
                  </div>
                  <span className="link-text">Training bot</span>
              </Link>
              )
            }
            </li>

            
            <li className="nav-item2" >
            { path=="trained" ? (
              <Link to={"/bot/" + botID + "/trained"} onClick={onSubmit} class="nav-check-open" name="menu-trained" >
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                </div>
                <span className="link-text" name="menu-trained">Trained</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/trained"}  onClick={onSubmit} class="nav-link2" name="menu-trained">
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="far fa-graduation-cap"></i>
                      </div>
                  </div>
                  <span className="link-text" >Trained</span>
              </Link>
              )
            }
            </li>

            <li className="nav-item2">
            { path=="group" ? (
              <Link to={"/bot/" + botID + "/group"} onClick={onSubmit} class="nav-check-open" name="menu-group">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-object-group"></i>
                  </div>
                </div>
                <span className="link-text">Group</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/group"} onClick={onSubmit} class="nav-link2" name="menu-group">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="far fa-object-group"></i>
                  </div>
                </div>
                <span className="link-text">Group</span>
              </Link> 
              )
            }
            </li>

            <li className="nav-item2">
            { path=="mapping" ? (  
              <Link to={"/bot/" + botID + "/mapping"} class="nav-check-open" name="menu-mapping">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                </div>
                <span className="link-text">Mapping</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/mapping"} class="nav-link2" name="menu-mapping">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="far fa-project-diagram"></i>
                  </div>
                </div>
                <span className="link-text">Mapping</span>
              </Link>  
              )
            }
            </li>

            <li className="nav-item2">
            { path=="history" ? (
              <Link to={"/bot/" + botID + "/history"} onClick={onSubmit} class="nav-check-open" name="menu-history">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-history"></i>
                  </div>
                </div>
                <span className="link-text">Order</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/history"} onClick={onSubmit} class="nav-link2" name="menu-history">
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="far fa-history"></i>
                      </div>
                  </div>
                  <span className="link-text">Order</span>
              </Link>
              )
            }  
            </li>
            
            <li className="nav-item2">
            { path=="inventory" ? (
              <Link to={"/bot/" + botID + "/inventory"} onClick={onSubmit} class="nav-check-open" name="menu-inventory">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-box-open"></i>
                  </div>
                </div>
                <span className="link-text">Inventory</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/inventory"} onClick={onSubmit} class="nav-link2" name="menu-inventory">
                  <div className="fa-group">
                      <div className="fa-secondary">
                      <i className="far fa-box-open"></i>
                      </div>
                  </div>
                  <span className="link-text">Inventory</span>
              </Link>
              )
            }
            </li>

            <li className="nav-item2">
            { path=="customer_infomation" ? (
              <Link to={"/bot/" + botID + "/customer_infomation"} onClick={onSubmit} class="nav-check-open" name="menu-customer">
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i className="fas fa-address-book"></i>
                  </div>
                </div>
                <span className="link-text">Customer <br></br> infomation</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/customer_infomation"} onClick={onSubmit} class="nav-link2" name="menu-customer">
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="far fa-address-book"></i>
                      </div>
                  </div>
                  <span className="link-text">Customer <br></br> infomation</span>
              </Link>
              )
            }
            </li>

            <li className="nav-item2">
            { path=="chat" ? (
              <Link to={"/chat/" + botID + "/live_chat/main" } onClick={onSubmit} class="nav-check-open" name="menu-chat" >
                <div className="fa-group">
                  <div className="fa-secondary">
                    <i class="fas fa-comments-alt"></i>
                  </div>
                </div>
                <span className="link-text">Chat</span>
              </Link> ) : (
              <Link to={"/chat/" + botID + "/live_chat/main"} onClick={onSubmit} class="nav-link2" name="menu-chat" >
                  <div className="fa-group">
                      <div className="fa-secondary">
                      <i class="far fa-comments-alt"></i>
                      </div>
                  </div>
                  <span className="link-text">Chat</span>
              </Link>
              )
            }
            </li>

          <li className="nav-item2">
            { path=="dashboard" ? (
              <Link to={"/bot/" + botID + "/dashboard"} onClick={onSubmit} class="nav-check-open" name="menu-customer">
                <div className="fa-group">
                  <div className="fa-secondary">
                      <i className="fas fa-user-chart"></i>
                  </div>
                </div>
                <span className="link-text">Dashcoard</span>
              </Link> ) : (
              <Link to={"/bot/" + botID + "/dashboard"} onClick={onSubmit} class="nav-link2" name="menu-customer">
                  <div className="fa-group">
                      <div className="fa-secondary">
                          <i className="fas fa-user-chart"></i>
                      </div>
                  </div>
                  <span className="link-text">Dashboard</span>
              </Link>
              )
            }
            </li>
            
          </ul>
        </nav>
      )}


    </Styles>
  );
}

export default connect()(Navbar_member);
