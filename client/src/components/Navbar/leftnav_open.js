import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Styles = styled.div`
.navbar {
  position: relative;
  background-color: #000000;
  // transition: width 600ms ease;
  overflow: hidden;
  top: 0;
  width: 15rem;
  height:92vh;
}

.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.link-text {
  display: inline;
  margin-left: 1rem;
  font weight: bolder;
  
}

.nav-link i {
  font-size: 1rem;
  font-weight
  min-width: 2rem;
  margin: 0 1.5rem;
  line-hight: 1.5rem;

}

.fa-group {
  line-hight: 5rem;
}


.navbar:hover .link-text {
    display: inline;
}

 
`

function Leftnav_open ({botID}) {
          return(
              <Styles>
                     <nav className="navbar" >
                        <ul className="navbar-nav">
                          {/* <div className="logo">
                            <div href="#" className="nav-link">
                              <span className="link-text logo-text">A1 Chatbot</span>
                            </div>
                          </div> */}
                          <li className="nav-item">
                            <Link to={'/bot/'+botID+'/training'} class="nav-link">
                              <div className="fa-group">
                                  <i className="fas fa-robot"></i>
                                  <span className="link-text">Training bot</span>
                              </div>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to={'/bot/'+botID+'/trained'} class="nav-link">
                              <div className="fa-group">
                                  <i class="fas fa-graduation-cap"></i>
                                  <span className="link-text">Trained</span>
                              </div>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to={'/bot/'+botID+'/group'} class="nav-link">
                              <div className="fa-group">
                                    <i class="fas fa-object-group"></i>
                                    <span className="link-text">Group</span>
                              </div>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to={'/bot/'+botID+'/mapping'} class="nav-link">
                              <div className="fa-group">
                                    <i class="fas fa-project-diagram"></i>
                                    <span className="link-text">Mapping</span>
                                </div>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <a href="#" class="nav-link">
                              <div className="fa-group">
                                  <div className="fa-secondary">
                                    <i class="fas fa-history"></i>
                                    <span className="link-text">History</span>
                                </div>
                              </div>     
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" class="nav-link">
                              <div className="fa-group">
                                <i class="fad fa-boxes"></i>
                                 <span className="link-text">Inventory</span>
                              </div>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" class="nav-link">
                              <div className="fa-group">
                                  <i class="far fa-address-book"></i>
                                  <span className="link-text">Customer infomation</span>
                              </div>
                            </a>
                          </li>
                        </ul>
                    </nav>
            </Styles>
            ) 
        }

export default Leftnav_open;