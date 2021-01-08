import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Chatbot from './images/Chatbot.svg'; 

import Register from './Page/Register';
import Login from './Page/Login'; 
import create_bot from './Page/Create_bot';
import Navbar from './components/Navbar/navbar';
import Footer from './components/footer/footer';
import Home from './Page/Home';
import Learned from './Page/Learned';
import Group from './Page/Group';
import Mapping from './Page/Mapping';
import Train from './Page/Train';
function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(()=>{
    fetch('/api').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component = { Home } />
            <Route path="/register" component={ Register } />
            <Route path="/login" component={ Login } />
            <Route path="/create_bot" component={ create_bot } />
            <Route path="/train" component={ Train }/>
            <Route path="/learned" component={ Learned }/>
            <Route path="/group" component={ Group }/>
            <Route path="/mapping" component={ Mapping }/>
          </Switch>
    </Router>
  );
}


export default App;
