import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DayPickerWrapper from "./components/DayPickerWrapper";

const calendarStyles = {
  margin: 0,
  padding: "10px",
  fontSize: "30px",
};

const mainHeadingStyles = {
  margin: 0,
  padding: "1px",
};

function App() {
  return (
    <div className="App">
      <div style={calendarStyles}>📅</div>
      <h1 style={mainHeadingStyles}>Hur många dagar?</h1>
      <h3>Välj start- och slutdatum för att se antalet dagar.</h3>
      <DayPickerWrapper />
    </div>
  );
}

export default App;
