import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switchs from './Components/Switch';

function App() {
  return (
    <BrowserRouter>
      <Switchs />
    </BrowserRouter>
  );
}

export default App;
