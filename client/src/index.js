import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/userStore';
import PostStore from './store/PostStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null);
root.render(
  <Context.Provider value={{
        userStore: new UserStore(),
        postStore: new PostStore()
         }}>
    <App />
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
