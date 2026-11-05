import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateAll = () => {
      // Actualizar contador de carrito
      const cart = JSON.parse(localStorage.getItem('nomadico_cart') || '[]');
      const total = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(total);

      // Actualizar usuario activo
      const user = JSON.parse(localStorage.getItem('nomadico_user') || 'null');
      setCurrentUser(user);
    };

    updateAll();
    window.addEventListener('storage', updateAll);
    const interval = setInterval(updateAll, 500);

    return () => {
      window.removeEventListener('storage', updateAll);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nomadico_user');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-warning">Nomadico Outdoor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>

            {/* Espacio dinámico: Aquí aparece "Hola, Sebastian/Admin" o "Iniciar Sesión" */}
            {currentUser ? (
              <Nav.Link className="text-warning fw-bold px-3">
                Hola, {currentUser.name} {currentUser.role === 'admin' ? '🔑' : '🌲'}
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/admin">Iniciar Sesión 🔑</Nav.Link>
            )}

            <Nav.Link as={Link} to="/carrito" className="position-relative px-3">
              <span className="me-1">🛒</span> Carrito
              {cartCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ fontSize: '0.7rem', border: '1px solid white', marginTop: '5px', marginLeft: '-5px' }}
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {currentUser && currentUser.role === 'admin' && (
              <Nav.Link as={Link} to="/admin">Admin 🛠️</Nav.Link>
            )}

            {currentUser && (
              <Nav.Link onClick={handleLogout} className="text-white-50 ms-2" style={{ cursor: 'pointer', fontSize: '0.8rem' }}>
                Cerrar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
