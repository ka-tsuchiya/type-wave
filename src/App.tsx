import React from 'react';
import './styles/App.css';
import TypeAreaMockWithRuby from './components/typing/TypeAreaMockWithRuby';

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
