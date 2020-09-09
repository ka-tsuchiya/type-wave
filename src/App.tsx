import React from 'react';
import './App.css';
import TypeAreaMockWithRuby from './TypeAreaMockWithRuby';

function App() {
  return (
    <div className="App" tabIndex={0}>
      <header className="App-header">
        <div id="Mock">
          <TypeAreaMockWithRuby />
        </div>
      </header>
    </div>
  );
}

export default App;
