import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './layout/LoginForm';
import Home from './layout/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

console.error = () => { };
console.warn = () => { };
console.log = () => { };
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
