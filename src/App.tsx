import React from 'react';
import logo from './logo.svg';
import './App.css';
import DayPickerWrapper from "./components/DayPickerWrapper"

function App() {
  return (
    <div className="App">
      <h1>Hur många dagar är det mellan?</h1>
      <DayPickerWrapper />
    </div>
  );
}

export default App;
