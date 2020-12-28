import React, {useState, useEffect} from 'react';
import './App.css';
// import Chatbot from './images/Chatbot.svg'; 
import { CardList } from './components/cardList';
import { Firstpage } from './components/Firstpage';

function App() {
  const [initialData, setInitialData] = useState([{}])

  // useEffect(()=>{
  //   fetch('/api').then(
  //     response => response.json()
  //   ).then(data => setInitialData(data))
  // }, []);

  return (
    <div className ="App">
      <div className="One">
        <Firstpage />
      </div>
        {/* <div className="Two">
          <CardList /> 
        </div> */}
        
    </div>    

  );
}

export default App;
