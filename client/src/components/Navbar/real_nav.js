import './real_nav.css';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import {Link} from 'react-router-dom';
import {isLoggedIn, deleteTokens} from '../auth';
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


function Nav(){
  if(isLoggedIn()){
    return Loged_in_nav(localStorage.getItem('username'));
  }
  else{
    return Normal_nav();
  }

}

function Normal_nav(){
  return(
    <Navbar_real>
      <Link to="/register">
          <div className="btn-signup btn-nav">
              <a className="btn btn-outline-secondary" role="button">Register</a>
          </div>    
      </Link>
      <Link to="/login">
          <div className="btn-login me-5 btn-nav">
              <a className="btn btn-info" role="button">Log in</a>
          </div>
      </Link>
      </Navbar_real>
      
    )
}

function Loged_in_nav(props) {

  return (
    
    
    <Navbar_real>
        <div className="show-user">  
          <a href="/"><i class="fas fa-user"></i>{props}</a>
        </div>
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar_real>
    
  );
}

function Navbar_real(props) {
  return (
    <nav className="navbar-real">
      <a href="/">
          <img href="/" src="/images/logo2.PNG" className="nav_brand"/>
      </a>    
          <ul className="navbar-nav-real">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    
    <li className="nav-item-real">
      <a href="#" className="icon-button-real" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}


function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('profile');
  const [menuHeight, setMenuHeight] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('user_id'));
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }


  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item-real" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button-real">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right-real">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    
    <div className="dropdown-real"  ref={dropdownRef}>

      {/* <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}> */}
      <CSSTransition
      in={activeMenu === 'signout'}
      timeout={500}
      classNames="menu-primary"
      unmountOnExit
      onClick={() => {
        deleteTokens();
        window.location.replace("/")
        }}>
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
          {/* <DropdownItem goToMenu="profile"
            leftIcon= {<i class="fas fa-user"></i>}>
              Edit Profile
          </DropdownItem> */}
          {/* <DropdownItem 
            leftIcon= {<i class="fas fa-book-open"></i>}>        
            Manual
          </DropdownItem> */}
          <DropdownItem goToMenu="signout"
            leftIcon= {<i className="fas fa-sign-out-alt signout-icon" >
              </i>}>
              SIGN OUT
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'profile'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onClick={() => {
          window.location.replace('/bot_list/'+username)
          }}>
        <div className="menu-real">
        <DropdownItem goToMenu="profile"
            leftIcon= {<i class="fas fa-user"></i>}>
              Edit Profile
          </DropdownItem>
        </div>
      </CSSTransition> 
    </div>

      // <CSSTransition
      //   in={activeMenu === 'settings'}
      //   timeout={500}
      //   classNames="menu-secondary"
      //   unmountOnExit
      //   onEnter={calcHeight}>
      //   <div className="menu-real">
      //     <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
      //       <h2>My Tutorial</h2>
      //     </DropdownItem>
      //     <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
      //     <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
      //     <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
      //     <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
      //   </div>
      // </CSSTransition> 

   
  );
}

export default Nav;
