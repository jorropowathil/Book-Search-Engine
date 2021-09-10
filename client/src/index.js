import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';


const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const server = new ApolloServer({ typeDefs });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
