// main.jsx - Starts the React app and provides Redux state to every component.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider makes the Redux store available to every component in the entire component tree without prop drilling. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
