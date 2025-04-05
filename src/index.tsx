import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

let element = document.getElementsByClassName('TypeArea')[0] as HTMLElement
element?.focus()

// element: Tabを入力できるようにしたい要素
element?.addEventListener("keydown", input_tab);

function input_tab(event: KeyboardEvent) {
    if (event.key === "Tab") {
        // デフォルト動作停止
        event.preventDefault();
    }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
