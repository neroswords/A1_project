import React from 'react';
import './App.css';
// import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { PrivateRoute } from "./Private.jsx";
import { CloseRoute } from "./closeRoute.jsx";
import { isLoggedIn } from './Components/auth.js';
import Register from './Page/Register';
import Login from './Page/Login';
import Home from './Page/Home';
import Learned from './Page/Learned';
import Group from './Page/Group';
// import DatatablePage from './Components/DatatablePage';
import Mapping from './Page/Mapping';
import Train from './Page/Train';
import Bot_list from './Page/Bot_list';
import Profile_edit from './Page/Profile_edit';
import Edit_bot from './Page/Edit_bot';
import Create_bot from './Page/Create_bot';
import Connect from './Page/Connect_bot'
import AddWord from './Components/Table/AddTable/AddWord';
import Nav from './Components/Navbar/real_nav';
import Add_item from './Page/Add_item';
import Inventory from './Page/Inventory';
import Customer_infomation from './Page/Customer_infomation';
import History from './Page/History';
function App() {
  return (
    <Router>
        <Nav/>
          <Switch>
            <Route path="/" exact component= { Home } />
            {/* <Route path="/DatatablePage" exact component= { DatatablePage } /> */}
            <CloseRoute isLoggedIn={isLoggedIn()} path="/register" exact component={ Register } />
            <CloseRoute isLoggedIn={isLoggedIn()} path="/login" exact component={ Login } />
            
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/profile/:user_id/edit" component={ Profile_edit }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot_list/:user_id" component={ Bot_list }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:user_id/create_bot" exact component ={ Create_bot } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/edit_bot" exact component ={ Edit_bot } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/connect" exact component ={ Connect } />
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/learned/add" cmponent={ AddWord }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/training" component={ Train }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/trained" component={ Learned }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/group" component={ Group }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/mapping" component={ Mapping }/>
            <PrivateRoute isloggedin={isLoggedIn()} exact path="/bot/:bot_id/add_item" component={ Add_item }/>
            <PrivateRoute isLoggedIn={isLoggedIn()} exact path="/bot/:bot_id/inventory" component={ Inventory } />
            <PrivateRoute isLoggedIn={isLoggedIn()} exact path="/bot/:bot_id/customer_infomation" component={ Customer_infomation } />
            <PrivateRoute isLoggedIn={isLoggedIn()} exact path="/bot/:bot_id/history" component={ History } />
            
          </Switch>
    </Router>
  );
}


export default App;
