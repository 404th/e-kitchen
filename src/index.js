import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/normalize.css"
import Cover from './Components/GlobalState'

ReactDOM.render(
    <React.StrictMode>
      <Cover>
        <App />
      </Cover>
    </React.StrictMode>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
