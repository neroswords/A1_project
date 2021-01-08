import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Register from './page/Register';
import Train from './page/Train';
import Login from './page/Login'
import Home from './page/Home'
import Navbar from './components/Navbar/navbar';
import Footer from './components/footer/footer';
import Home from './Page/Home';
import Learned from './Page/Learned';
import Group from './Page/Group';
import Mapping from './Page/Mapping';
import Train from './Page/Train';
function App() {
  const [initialData, setInitialData] = useState([{}])

  // useEffect(()=>{
  //   fetch('/api').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);

  return (
    <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component = { Home } />
            <Route path="/register" component={ Register } />
            <Route path="/login" component={ Login } />
            <Route path="/Train" component={ Train }/>
            <Route path="/Learned" component={ Learned }/>
            <Route path="/Group" component={ Group }/>
            <Route path="/Mapping" component={ Mapping }/>
          </Switch>
    </Router>
  );
}


export default App;
