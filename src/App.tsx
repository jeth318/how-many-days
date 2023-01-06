import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DayPickerWrapper from "./components/DayPickerWrapper";

function App() {
  return (
    <div className="App">
      <h1>Hur jävla många dagar?</h1>
      <h3>
        Välj datum nedan och se hur många dagar det är från start- till
        slutdatum.
      </h3>
      <hr />
      <DayPickerWrapper />
    </div>
  );
}

export default App;
