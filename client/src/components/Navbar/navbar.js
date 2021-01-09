import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";
import {isLoggedIn, deleteTokens} from '../auth';

const Styles = styled.div`

h1 {
    font-size: 35px;
    font-weight: 700;
}

.btn {
    border-radius: 1rem;
    font-weight: bold;
    transition: all 0.2s;
    width: 100%;
    text-transform : uppercase;
    padding-left: 2rem;
    padding-right: 2rem;
}

.btn-login {
    margin-left: 2rem;
}

`;

const Log = () =>{
    if(isLoggedIn()){
        return(
            <form className="d-flex">
            <Button className=" btn btn-danger"
          onClick={() => {
            deleteTokens();
            window.location.replace("/")
          }}
        >
          Sign out
        </Button>
        </form>
        )
    }else{
        return(
            <form className="d-flex">
                <Link to="/register">
                    <div className="btn-signup">
                        <a className="btn btn-outline-secondary" role="button">Register</a>
                    </div>    
                </Link>
                <Link to="/login">
                    <div className="btn-login">
                        <a className="btn btn-info" role="button">Log in</a>
                    </div>
                </Link>
            </form>
        )
    }
}

function Navbar(){
    return (
        <Styles>
                <div className="container">
                    <div className="col-sm-10 col-md-9 col-lg-12 mx-auto">
                        <nav className="navbar">
                            <div className="container-fluid">
                                <a class="navbar-brand" href="/">
                                    <img href="/" src="/images/logo2.PNG" height="60" className="d-inline-block align-top mt-2"/>
                                </a>                                
                                <Log />   
                            </div>
                        </nav>
                    </div>
                </div>
        </Styles>
    )
}

export default Navbar;