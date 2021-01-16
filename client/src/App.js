import React from 'react';
import './App.css';
// import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { PrivateRoute } from "./Private.jsx";
import { CloseRoute } from "./closeRoute.jsx";
import { isLoggedIn } from './components/auth.js';

import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import Learned from './page/Learned';
import Group from './page/Group';
import Mapping from './page/Mapping';
import Train from './page/Train';
import Bot_list from './page/Bot_list';
import Create_bot from './page/Create_bot';
import Connect from './page/Connect_bot'
import AddWord from './components/table/addTable/AddWord';
import Nav from './components/Navbar/real_nav';

function App() {
  return (
    <Router>
        <Nav/>
          <Switch>
            <Route path="/" exact component= { Home } />
            <CloseRoute isLoggedIn={isLoggedIn()} path="/register" exact component={ Register } />
            <CloseRoute isLoggedIn={isLoggedIn()} path="/login" exact component={ Login } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot_list/:user_id" component={ Bot_list }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:user_id/create_bot" exact component ={ Create_bot } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/connect" exact component ={ Connect } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/train" component={ Train }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/learned" component={ Learned }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/group" component={ Group }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/mapping" component={ Mapping }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/learned/add" component={ AddWord }/>
          </Switch>
    </Router>
  );
}


export default App;
