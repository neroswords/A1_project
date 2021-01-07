import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  }

`;

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
                                    <div className="btn-regis me-4">
                                        <Link to="/register">
                                            <a className="btn btn-outline-secondary me-5" href="#" role="button">Register</a>
                                        </Link>
                                    </div>
                                    <div className="btn-login">
                                        <Link to="/login">
                                            <a className="btn btn-info me-5 " href="#" role="button">Log in</a>
                                        </Link>
                                    </div>    
                                </form>
                        </div>
                        </nav>
                    </div>
                </div>
        </Styles>
    )
}

export default Navbar;