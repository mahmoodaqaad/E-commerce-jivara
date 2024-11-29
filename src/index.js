import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import MyState from './Context/MyState';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import './CSS/Form.css'
import './CSS/auth.css'

import './App.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MyState>

    <React.StrictMode>
      <Router>

        <App />
      </Router>
    </React.StrictMode>
  </MyState>
);


