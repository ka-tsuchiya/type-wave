import React from 'react';
import './App.css';
import TypeAreaMock from './TypeAreaMock3'
import TypeAreaMockWithRuby from './TypeAreaMockWithRuby';

function App() {
  return (
    <div className="App" tabIndex={0}>
      <header className="App-header">
        <div id="Mock">
          {/* <TypeAreaMock /> */}
          <TypeAreaMockWithRuby />
        </div>
      </header>
    </div>
  );
}

export default App;
