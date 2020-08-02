import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {CompoundInterestPage} from "./layout/organism/CompoundInterestPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CompoundInterestPage />
      </header>
    </div>
  );
}

export default App;
