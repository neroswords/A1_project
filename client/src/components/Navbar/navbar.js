import React from 'react';

function Navbar(){
    return (
    <header className="Navbar">
        <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand">A1 Chatbot</a>
            <form className="d-flex">
            <a className="btn btn-outline-secondary me-2" href="#" role="button">Log in</a>
            <a className="btn btn-info" href="#" role="button">Register</a>   
            </form>
        </div>
        </nav>
    </header>
    )
}

export default Navbar;