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

`;

const Log = () =>{
    if(isLoggedIn()){
        return(
            <Button className=" btn btn-info"
          onClick={() => {
            deleteTokens();
            window.location.replace("/")
          }}
        >
          Sign out
        </Button>
        )
    }else{
        return(
            <Link to="/login">
                <a className=" btn btn-info" role="button">Log in</a>
            </Link> 
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
                            <img href="/" src="/images/logo2.PNG" height="70" className="d-inline-block align-top mt-2"/>
                        </a>
                            <form className="d-flex">
                                <Link to="/register">
                                    <a className="btn btn-outline-secondary me-4" href="#" role="button">Register</a>
                                </Link>
                                <Log />   
                            </form>
                        </div>
                        </nav>
                    </div>
                </div>
        </Styles>
    )
}

export default Navbar;