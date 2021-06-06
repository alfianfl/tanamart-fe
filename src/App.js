import './App.css'
import React, { Component } from "react";
import Routes from "./config/Routes";
import "./assets/css/preloader.css";

class App extends Component {
  render() {
    return (
      <>
        <div className="loader ">
          <div id="preloader" />
        </div>
        <Routes />
      </>
    );
  }
}

export default App;
