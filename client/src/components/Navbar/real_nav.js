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
      <Link to="#">
          <div className="btn-signup btn-nav">
              <a className="btn" role="button">Home</a>
          </div>
      </Link>
      <Link to="#">
          <div className="btn-signup btn-nav">
              <a className="btn" role="button">ABOUT</a>
          </div>
      </Link>
      <Link to="/register">
          <div className="btn-signup btn-nav">
              <a className="btn" role="button">Register</a>
          </div>
      </Link>
            <Link to="/login">
          <div className="btn-login btn-nav">
              <a className="btn" role="button">Log in</a>
          </div>
      </Link>
      </Navbar_real>
    )
}

function Loged_in_nav(props) {
  const [main, setMain] = useState(window.location.hash)
  
  return (
    <Navbar_real>
<<<<<<< HEAD
        <div className= {"show-user " + (main == "#main" ? "click-show-user" :"")}>
            <a className="click" href={"/bot_list/"+ localStorage.getItem('user_id')+"#main"}><i class="fas fa-user-circle"></i>{props}</a>
=======
        <div className="show-user" >  
          <a href={"/bot_list/"+ localStorage.getItem('user_id')} name="validate_user"><i class="fas fa-user"></i>{props}</a>
>>>>>>> 3736762ecdedf3a05a6616afeb320baa700a545f
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
  const [activeMenu, setActiveMenu] = useState('main');
  const [username, setUsername] = useState(localStorage.getItem('user_id'));
  const dropdownRef = useRef(null);

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
      <CSSTransition
      in={activeMenu === 'main'}
      timeout={500}
      classNames="menu-primary"
      unmountOnExit
      >
        <div className="menu-real">

           <a onClick={() => {
            window.location.replace("/profile/"+ localStorage.getItem('user_id')+"/edit")
          }}>
            <DropdownItem 
              leftIcon= {<i class="fas fa-user"></i>}>
                Edit Profile
            </DropdownItem>
          </a>

          <a onClick={() => {
            window.location.replace("/bot_list/"+ localStorage.getItem('user_id'))
          }}>
            <DropdownItem 
              leftIcon= {<i class="fas fa-robot"></i>}>
                Manage Bot
            </DropdownItem>
          </a>

          <a onClick={() => {
            window.location.replace('/manual')
          }}>
            <DropdownItem 
              leftIcon= {<i class="fas fa-book-open"></i>}>        
              Manual
            </DropdownItem>
          </a>
          <a onClick={() => {
            deleteTokens();
            window.location.replace("/")
          }}>
            <DropdownItem 
              leftIcon= {<i className="fas fa-sign-out-alt signout-icon" >
                </i>}>
                SIGN OUT
            </DropdownItem>
          </a>
        </div>
      </CSSTransition>
    </div>

  );
}

export default Nav;
