import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/dataService';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'user' or 'admin'
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState({ username: '', password: '' });
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Accesorios', price: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('nomadico_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUserRole(userData.role);
      setUserName(userData.name);
      setIsLoggedIn(true);
      if (userData.role === 'admin') loadProducts();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    let userData = null;

    if (user.username === 'admin' && user.password === '123') {
      userData = { name: 'Administrador', role: 'admin' };
    } else if (user.username === 'sebastian' && user.password === '123') {
      userData = { name: 'Sebastian', role: 'user' };
    }

    if (userData) {
      setUserRole(userData.role);
      setUserName(userData.name);
      setIsLoggedIn(true);
      setShowWelcome(true);
      localStorage.setItem('nomadico_user', JSON.stringify(userData));
      if (userData.role === 'admin') loadProducts();
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  const loadProducts = async () => {
    const data = await ProductService.getAll();
    setProducts(data);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (editingId) {
      await ProductService.update(editingId, newProduct);
      setEditingId(null);
    } else {
      await ProductService.create(newProduct);
    }
    setNewProduct({ name: '', category: 'Accesorios', price: '', description: '' });
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await ProductService.delete(id);
      loadProducts();
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setNewProduct({ ...product });
  };

  if (!isLoggedIn) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card className="product-card p-4 shadow-lg" style={{ width: '400px' }}>
          <div className="text-center mb-4">
            <h2 className="catalog-title">Acceso Sistema</h2>
            <p className="text-white-50">Ingresa tus credenciales</p>
          </div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Usuario</Form.Label>
              <Form.Control
                type="text"
                className="bg-dark text-white border-warning"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-white">Contraseña</Form.Label>
              <Form.Control
                type="password"
                className="bg-dark text-white border-warning"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </Form.Group>
            <Button variant="outdoor" className="btn-outdoor w-100" type="submit">
              Ingresar
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {showWelcome && (
        <div className="position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 10000 }}>
          <Card className="product-card p-4 text-center shadow-lg animate-fade-in" style={{ width: '300px' }}>
            <h3 className="catalog-title">¡Hola, {userName}! 👋</h3>
            <p className="text-white">Bienvenido a Nomadico Outdoor</p>
            <Button variant="warning" size="sm" onClick={() => setShowWelcome(false)}>Entendido</Button>
          </Card>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="catalog-title">
          {userRole === 'admin' ? `Hola, ${userName}! 👋` : `Hola, ${userName}`}
        </h2>
        <Button variant="outline-danger" onClick={() => {
          localStorage.removeItem('nomadico_user');
          setIsLoggedIn(false);
        }}>Cerrar Sesión</Button>
      </div>

      {userRole === 'admin' ? (
        <Row>
          <Col lg={12} className="mb-4">
            <Row className="g-3">
              <Col md={4}>
                <Card className="product-card p-3 text-center">
                  <h6 className="text-white-50">Ventas Estimadas</h6>
                  <h3 className="catalog-title">$1,250,000</h3>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="product-card p-3 text-center">
                  <h6 className="text-white-50">Consultas IA más comunes</h6>
                  <h3 className="catalog-title">"Carpas"</h3>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="product-card p-3 text-center">
                  <h6 className="text-white-50">Producto más visto</h6>
                  <h3 className="catalog-title">Chaquetón Montaña</h3>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col lg={4} className="mb-4">
            <Card className="product-card p-3">
              <h4 className="catalog-title mb-3">{editingId ? 'Editar Producto' : 'Agregar Producto'}</h4>
              <Form onSubmit={handleCreateOrUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Nombre</Form.Label>
                  <Form.Control
                    className="bg-dark text-white border-warning"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Categoría</Form.Label>
                  <Form.Select
                    className="bg-dark text-white border-warning"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="Alquiler">Alquiler</option>
                    <option value="Reacondicionado">Reacondicionado</option>
                    <option value="Accesorios">Accesorios</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Precio ($)</Form.Label>
                  <Form.Control
                    type="number"
                    className="bg-dark text-white border-warning"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white">Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="bg-dark text-white border-warning"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button variant="outdoor" className="btn-outdoor w-100" type="submit">
                    {editingId ? 'Actualizar' : 'Guardar'}
                  </Button>
                  {editingId && (
                    <Button variant="secondary" onClick={() => {
                      setEditingId(null);
                      setNewProduct({ name: '', category: 'Accesorios', price: '', description: '' });
                    }}>
                      Cancelar
                    </Button>
                  )}
                </div>
              </Form>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="product-card p-3">
              <h4 className="catalog-title mb-3">Lista de Inventario</h4>
              <Table responsive className="text-white">
                <thead className="text-warning">
                  <tr style={{ borderBottom: '2px solid var(--ocre-arcilla)' }}>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td><Badge bg="info">{p.category}</Badge></td>
                      <td>${p.price}</td>
                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <Button variant="outline-light" size="sm" onClick={() => startEdit(p)}>✏️</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}>🗑️</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="product-card p-5 text-center">
              <h3 className="catalog-title">¡Hola, {userName}! 👋</h3>
              <p className="text-white fs-5">Bienvenido a tu área personal de cliente.</p>
              <p className="text-white-50">Aquí puedes ver tus compras recientes y gestionar tu perfil.</p>
              <div className="mt-4 p-3 bg-dark rounded border border-warning">
                <p className="m-0">Estado de cuenta: <Badge bg="success">Activo</Badge></p>
              </div>
              <Button variant="outdoor" className="btn-outdoor mt-4" onClick={() => navigate('/productos')}>
                Seguir Comprando
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminPanel;
