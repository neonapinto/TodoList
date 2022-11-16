import React from 'react';
import './App.css';
import Database from './components/DatabasePanel/DatabasePanel';
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';

function App() {
  return (
    <div className="App">
        <Header/>
        <Database/>
        <Tasks/>
    </div>
  );
}

export default App;
