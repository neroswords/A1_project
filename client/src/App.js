import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Chatbot from './images/Chatbot.svg'; 

import Register from './page/Register';
import Train from './page/Train';
import Home from './page/Home';
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
            <Route path="/train" component={ Train }/>
            <Route path="/learned" component={ Learned }/>
            <Route path="/group" component={ Group }/>
            <Route path="/mapping" component={ Mapping }/>
          </Switch>
    </Router>
  );
}


export default App;
