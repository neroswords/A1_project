import React, {useState, useEffect} from 'react';
import './App.css';


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
    // for footer
    <div className="page-container"> 
    <div className="content-wrap">
      <Navbar />  
    </div>
      <Footer />
    </div>
  );
}

export default App;
