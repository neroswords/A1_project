import React from 'react';
import styled from 'styled-components';

const Styles = styled.div` 
  .navbar {
    position: relative;
    background-color: #14213d;
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
  }
  
  .nav-link i {
    font-size: 2rem;
    min-width: 2rem;
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
    transition: var(--transition-speed);
  }
  
  
  /* Large screens */
  @media only screen and (min-width: 600px) {
    .navbar {
      top: 0;
      width: 5rem;
      height:90vh;
    }
  
    .navbar:hover {
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
  
`

function Navbar_member() {
  
        return(
            <Styles>
                  <nav className="navbar">
                    <ul className="navbar-nav">
                      {/* <div className="logo">
                        <div href="#" className="nav-link">
                          <span className="link-text logo-text">A1 Chatbot</span>
                        
                        </div>
                      </div> */}
                
                      <li className="nav-item">
                        <a href="/train" class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i className="fas fa-robot"></i>
                            </div>
                          </div>
                          <span className="link-text">Trainbot</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-object-group"></i>
                            </div>
                          </div>
                          <span className="link-text">Group</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#" class="nav-link">
                          <div className="fa-group">
                              <div className="fa-secondary">
                                <i class="fas fa-project-diagram"></i>
                            </div>
                          </div>
                          <span className="link-text">Mapping</span>
                        </a>
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
                  </nav>
              
          </Styles>
        )
    
}

export default Navbar_member;