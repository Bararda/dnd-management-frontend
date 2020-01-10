import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './core/nav-bar/nav-bar';
import LoginPage from './components/login-page/login-page';
function App() {
  return (
    <div className="App">
        <NavBar></NavBar>
        <LoginPage/>
    </div>
  );
}

export default App;
