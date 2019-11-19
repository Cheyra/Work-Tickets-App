import React from 'react';
import './App.css';
import Homepage from './homepage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1> React starter-App </h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Homepage/>
      </header>
    </div>
  );
}

export default App;
