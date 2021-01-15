import React, {useState, useEffect} from 'react';
import './App.css';
// import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Register from './Page/Register';
import Login from './Page/Login';
import Home from './Page/Home';
import Footer from './components/footer/footer';
import Learned from './Page/Learned';
import Group from './Page/Group';
import Mapping from './Page/Mapping';
import Train from './Page/Train';
import Bot_list from './Page/Bot_list';
import Create_bot from './Page/Create_bot';
import AddWord from './components/table/addTable/AddWord';
import Nav from './components/Navbar/real_nav';

function App() {
  return (
    <Router>
        <Nav/>
          <Switch>
            <Route path="/" exact component= { Home } />
            <Route path="/register" component={ Register } />
            <Route path="/login" component={ Login } />
            <Route path="/train" component={ Train }/>
            <Route path="/learned" component={ Learned }/>
            <Route path="/group" component={ Group }/>
            <Route path="/mapping" component={ Mapping }/>
            <Route path="/add" component={ AddWord }/>
            <Route path="/create_bot" component ={ Create_bot } />
            <Route path="/bot_list" component ={ Bot_list }/>
          </Switch>
    </Router>
  );
}


export default App;
