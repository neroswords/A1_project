import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styles = styled.div`
h1 {
    font-size: 35px;
    font-weight: 700;
}

`;

function Navbar(){
    return (
        <Styles>
                <nav className="navbar">
                <div className="container-fluid">
                        <h1 className="navbar-brand me-auto">A1 Chatbot Logo</h1>
                    <form className="d-flex">
                        <Link to="/">
                            <a className="btn btn-outline-secondary me-4 " href="#" role="button">Log in</a>
                        </Link>
                        <Link to="/register">
                            <a className="btn btn-info " href="#" role="button">Register</a>
                        </Link> 
                    </form>
                </div>
                </nav>
        </Styles>
    )
}

export default Navbar;