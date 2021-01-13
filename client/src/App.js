import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { PrivateRoute } from "./Private.jsx";
import { CloseRoute } from "./closeRoute.jsx";
import { isLoggedIn } from './components/auth.js';

import Register from './Page/Register';
import Login from './Page/Login';
import Home from './Page/Home';
import Navbar from './components/Navbar/navbar';
import Learned from './Page/Learned';
import Group from './Page/Group';
import Mapping from './Page/Mapping';
import Train from './Page/Train';
import Create_bot from './Page/Create_bot';
import Connect from './Page/Connect_bot'
import Bot_list from './Page/Bot_list';
import AddWord from './components/table/addTable/AddWord';

function App() {

  return (
    <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component= { Home } />
            <CloseRoute isLoggedIn={isLoggedIn()} path="/register" exact component={ Register } />
            <CloseRoute isLoggedIn={isLoggedIn()} path="/login" exact component={ Login } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot_list/:user_id" component={ Bot_list }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:user_id/create_bot" exact component ={ Connect } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/connect" exact component ={ Create_bot } />
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
