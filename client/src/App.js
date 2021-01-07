import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './Page/Home';
import Register from './Page/Register';
import Login from './Page/Login';
import Navbar from './components/Navbar/navbar';


// import Main from './components/Main';

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
          </Switch>
    </Router>
  );
}


export default App;
