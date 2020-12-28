import React from 'react';
import styled from 'styled-components';

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
                        <a className="btn btn-outline-secondary me-4 " href="#" role="button">Log in</a>
                        <a className="btn btn-info " href="#" role="button">Register</a>   
                    </form>
                </div>
                </nav>
        </Styles>
    )
}

export default Navbar;