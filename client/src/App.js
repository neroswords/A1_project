import React, {useState, useEffect} from 'react';
import './App.css';


import Navbar from './components/Navbar/navbar';
import Footer from './components/footer'

function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(()=>{
    fetch('/api').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Footer />

    </div>
  );
}

export default App;
