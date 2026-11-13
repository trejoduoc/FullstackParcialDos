import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import Contacto from './components/Contacto';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
