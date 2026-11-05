import React from 'react';
import AppNavbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <div className="container">
        <h1 className="text-center mt-5">Bienvenido a Nomadico Outdoor</h1>
        <p className="text-center lead">Equipamiento profesional para tus aventuras.</p>
      </div>
    </div>
  );
}

export default App;
