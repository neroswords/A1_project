import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Chatbot from './images/Chatbot.svg'; 

import Register from './Page/Register';
import Login from './Page/Login';
import Navbar from './components/Navbar/navbar';
import Footer from './components/footer/footer'
import Create_bot from './Page/Create_bot';

import Navbar from './components/Navbar/navbar';
import Footer from './components/footer/footer';
import Learned from './page/Learned';
import Group from './page/Group';
import Mapping from './page/Mapping';
// import Main from './components/Main';

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
            <Route path="/Train" component={ Train }/>
            <Route path="/Learned" component={ Learned }/>
            <Route path="/Group" component={ Group }/>
            <Route path="/Mapping" component={ Mapping }/>
          </Switch>
    </Router>
  );
}


export default App;
