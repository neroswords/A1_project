import React, {useState, useEffect} from 'react';
import './App.css';
import { TestForm } from './component/testForm';
import {Container} from'semantic-ui-react';

function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(()=>{
    fetch('/api').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);

  return (
    <div className="App">
      <Container>
        <TestForm />
      </Container>
    </div>
  );
}

export default App;
