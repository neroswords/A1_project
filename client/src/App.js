import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Chatbot from './images/Chatbot.svg'; 
import { CardList } from './components/Landing/cardList';
import { Mainpage } from './components/Landing/Mainpage';
import { Endpage }  from  './components/Landing/endpage';

import Register from './Page/Register';

import Navbar from './components/Navbar/navbar';
import Footer from './components/footer/footer'
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
          </Switch>
    </Router>
  );
}

const Home = () => (
  <div className="page-container"> 
    <div className="conatainer">
      <Mainpage />
      <CardList/>
      <Endpage/>
    </div>
    <Footer />
  </div>
)

export default App;
