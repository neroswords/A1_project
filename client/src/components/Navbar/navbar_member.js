import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Styles = styled.div` 
  .navbar {
    position: relative;
    background-color: #000000;
    transition: width 600ms ease;
    overflow: hidden;
    higth: 100%;
    width: 100%;
  }
  
  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .nav-item {
    width: 100%;
  }

  
  // .nav-item:last-child {
  //   margin-top: auto;
  // }
  
  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: yeollow;
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--transition-speed);
  }
  
  .nav-link:hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: white;
  }
  
  .link-text {
    display: none;
    margin-left: 1rem;
    font weight: bolder;
  }
  
  .nav-link i {
    font-size: 1.5rem;
    font-weight
    min-width: 2rem;
    margin: 0 1.5rem;
  }
  
  .fa-primary {
    color: #000000;
  }
  
  .fa-secondary {
    color: #fca311;
  }
  
  .fa-primary,
  .fa-secondary {
    transition: var(--transition-speed);
  }
  
  
  /* Large screens */
  @media only screen and (min-width: 600px) {
    .navbar {
      top: 0;
      width: 5rem;
      height:92vh;
    }
  
    .navbar5:hover {
      width: 14rem;
    }
  
    .navbar:hover .link-text {
      display: inline;
    }
  
  
    .navbar:hover .logo-text
    {
      left: 0px;
    }
  }
  
  .theme-icon {
    display: none;
  }

  #check {
    display: none;
  }
  
  // label #btn{
  //   position: absolute;
  //   background: #042331;
  //   border-radius: 3px;
  //   cursor: pointer;
  // }
  
  // label #btn {
  //   left: 40px;
  //   top: 25px;
  //   font-size: 1px;
  //   color: white;
  //   padding: 6px 12px;
  //   transition: all 0.5s;
  // }
  
  // label #cancel {
  //   z-index: 1111;
  //   left: -195px;
  //   top: 17px;
  //   font-size: 30px;
  //   color: white;
  //   padding: 4px 9px;
  //   transition: all 0.5s ease;
  // }
  
  // #check:checked ~ label #btn {
  //   left: 250px;
  //   opacity: 0;
  //   pointer-events: none;
  // }
  
  .navbar span{
    font-weight: bold;
    // margin-left: 15%;
  }
  //////////////////////////////////////////
  .navbar2 {
    position: relative;
    background-color: #000000;
    transition: width 600ms ease;
    overflow: hidden;
    higth: 100%;
    width: 100%;
  }
  
  .navbar-nav2 {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .nav-item2 {
    width: 100%;
  }

  
  // .nav-item:last-child {
  //   margin-top: auto;
  // }
  
  .nav-link2 {
    display: flex;
    align-items: center;
    height: 5rem;
    color: yeollow;
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--transition-speed);
  }
  
  .nav-link2:hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: white;
  }
  
  .link-text2 {
    display: none;
    margin-left: 1rem;
    font weight: bolder;
  }
  
  .nav-link2 i {
    font-size: 1.5rem;
    font-weight
    min-width: 2rem;
    margin: 0 1.5rem;
  }
  
  .fa-primary2 {
    color: #000000;
  }
  
  .fa-secondary2 {
    color: #fca311;
  }
  
  .fa-primary2,
  .fa-secondary {
    transition: var(--transition-speed);
  }
  
  
  /* Large screens */
  @media only screen and (min-width: 600px) {
    .navbar2 {
      top: 0;
      width: 5rem;
      height:92vh;
    }
  
    .navbar2:hover {
      width: 14rem;
    }
  
    .navbar2:hover .link-text {
      display: inline;
    }
  
  
    .navbar2:hover .logo-text
    {
      left: 0px;
    }
  }
  
  .theme-icon2 {
    display: none;
  }

  #check {
    display: none;
  }
  
  // label #btn{
  //   position: absolute;
  //   background: #042331;
  //   border-radius: 3px;
  //   cursor: pointer;
  // }
  
  // label #btn {
  //   left: 40px;
  //   top: 25px;
  //   font-size: 1px;
  //   color: white;
  //   padding: 6px 12px;
  //   transition: all 0.5s;
  // }
  
  // label #cancel {
  //   z-index: 1111;
  //   left: -195px;
  //   top: 17px;
  //   font-size: 30px;
  //   color: white;
  //   padding: 4px 9px;
  //   transition: all 0.5s ease;
  // }
  
  // #check:checked ~ label #btn {
  //   left: 250px;
  //   opacity: 0;
  //   pointer-events: none;
  // }
  
  .navbar2 span{
    font-weight: bold;
    // margin-left: 15%;
  }

`


function Navbar_member({botID}) {
  const [change, setchange] = useState(false)
  const Change = () => {
    if(change == true )
    {
      setchange(false)
    }
    else setchange(true)
   
  }
  

        return(
            <Styles><botton onClick={Change} > X </botton>
             
              {change ?        <nav className="navbar">
                    <ul className="navbar-nav">
                    
                      {/* <div className="logo">
                        <div href="#" className="nav-link">
                          <span className="link-text logo-text">A1 Chatbot</span>
                        
                        </div>
                      </div> */}

                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/training'} class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i className="fas fa-robot"></i>
                            </div>
                          </div>
                          <span className="link-text">Training bot</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/trained'} class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                          </div>
                          <span className="link-text">Trained</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/group'} class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-object-group"></i>
                            </div>
                          </div>
                          <span className="link-text">Group</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/mapping'} class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-project-diagram"></i>
                            </div>
                          </div>
                          <span className="link-text">Mapping</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-history"></i>
                            </div>
                          </div>
                          <span className="link-text">History</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                              <i class="fad fa-boxes"></i>
                            </div>
                          </div>
                          <span className="link-text">Inventory</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="far fa-address-book"></i>
                            </div>
                          </div>
                          <span className="link-text">Customer infomation</span>
                        </a>
                      </li>
          
                    </ul>
                  </nav>:      
                          <nav className="navbar2"> 
                    <ul className="navbar-nav">
                      {/* <div className="logo">
                        <div href="#" className="nav-link">
                          <span className="link-text logo-text">A1 Chatbot</span>
                        
                        </div>
                      </div> */}

                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/training'} class="nav-link2">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i className="fas fa-robot"></i>
                            </div>
                          </div>
                          <span className="link-text">Training bot</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/trained'} class="nav-link2">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                          </div>
                          <span className="link-text">Trained</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/group'} class="nav-link2">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-object-group"></i>
                            </div>
                          </div>
                          <span className="link-text">Group</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={'/bot/'+botID+'/mapping'} class="nav-link2">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-project-diagram"></i>
                            </div>
                          </div>
                          <span className="link-text">Mapping</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link2">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-history"></i>
                            </div>
                          </div>
                          <span className="link-text">History</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link2">
                          <div className="fa-group">
                              <div className="fa-secondary">
                              <i class="fad fa-boxes"></i>
                            </div>
                          </div>
                          <span className="link-text">Inventory</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="far fa-address-book"></i>
                            </div>
                          </div>
                          <span className="link-text">Customer infomation</span>
                        </a>
                      </li>
          
                    </ul>
                  </nav>}
    
              
          </Styles>
        ) 
}

export default Navbar_member;