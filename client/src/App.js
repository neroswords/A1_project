import React, {useState, useEffect} from 'react';
import './App.css';
// import Chatbot from './images/Chatbot.svg'; 
import { CardList } from './components/Landing/cardList';
import { Mainpage } from './components/Landing/Mainpage';
import { Endpage }  from  './components/Landing/endpage';

import Navbar from './components/Navbar/navbar';
import Footer from './components/footer/footer'

function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(()=>{
    fetch('/api').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <div className="page-container"> 
        <div className="conatainer">
          <Navbar />
          <Mainpage />
          <CardList/>
          <Endpage/>
        </div>
        <Footer />
    </div>
    
  );
}

export default App;
