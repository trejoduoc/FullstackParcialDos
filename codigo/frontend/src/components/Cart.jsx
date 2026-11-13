import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [step, setStep] = useState('cart'); // 'cart', 'payment', 'summary'

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('nomadico_cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const newCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(newCart);
    localStorage.setItem('nomadico_cart', JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem('nomadico_cart', JSON.stringify(newCart));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'outdoor') {
      setDiscount(0.10); // 10%
      alert("¡Cupón OUTDOOR aplicado! 10% de descuento.");
    } else {
      alert("Cupón no válido.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const couponDiscount = subtotal * discount;
  const paymentDiscount = paymentMethod === 'credit' ? subtotal * 0.05 : 0;
  const total = subtotal - couponDiscount - paymentDiscount;

  if (step === 'summary') {
    return (
      <Container className="py-5 text-center">
        <div className="p-5 rounded shadow-sm" style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid var(--sol-dorado)' }}>
          <h1 className="catalog-title mb-4">¡Compra Exitosa! 🌲</h1>
          <p className="text-white fs-4">Tu equipo outdoor está en camino.</p>
          <div className="my-4 p-3 bg-dark rounded text-start mx-auto" style={{ maxWidth: '400px' }}>
            <p className="text-white">Total pagado: <strong>${total.toFixed(0)}</strong></p>
            <p className="text-white">Método: {paymentMethod === 'credit' ? 'Tarjeta de Crédito' : paymentMethod === 'rut' ? 'Cuenta RUT' : 'Mercado Pago'}</p>
          </div>
          <Button variant="outdoor" className="btn-outdoor mt-3" onClick={() => {
            localStorage.removeItem('nomadico_cart');
            window.location.href = '/';
          }}>
            Volver al Inicio
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center my-4 catalog-title">Tu Carrito de Aventuras</h2>

      {cartItems.length === 0 ? (
        <div className="text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh', paddingTop: '2rem' }}>
          <div className="p-4 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,193,7,0.3)', maxWidth: '500px', width: '100%' }}>
            <h3 className="text-warning mb-3">🛒 Tu carrito está vacío</h3>
            <p className="text-white fs-5 mb-4">¡Explora nuestro catálogo y encuentra tu próximo equipo outdoor!</p>
            <Link to="/productos" className="btn btn-outdoor px-4 py-2">Ver Catálogo</Link>
          </div>
        </div>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="product-card mb-4">
              <Card.Body>
                <Table responsive className="text-white">
                  <thead className="text-warning">
                    <tr style={{ borderBottom: '2px solid var(--ocre-arcilla)' }}>
                      <th>Producto</th>
                      <th className="text-center">Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td className="py-3">{item.name}</td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <Button variant="outline-light" size="sm" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                            <span className="fw-bold">{item.quantity}</span>
                            <Button variant="outline-light" size="sm" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                          </div>
                        </td>
                        <td>${item.price}</td>
                        <td className="fw-bold">${(item.price * item.quantity).toFixed(0)}</td>
                        <td className="text-center">
                          <Button variant="outline-danger" size="sm" onClick={() => removeItem(item.id)}>❌</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="product-card p-3">
              <h4 className="catalog-title mb-3">Resumen de Pago</h4>
              <div className="d-flex justify-content-between text-white mb-2">
                <span>Subtotal:</span> <span className="fw-bold">${subtotal.toFixed(0)}</span>
              </div>

              <div className="my-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-warning"
                    placeholder="Cupón (ej: outdoor)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button variant="warning" onClick={applyCoupon}>Aplicar</Button>
                </div>
              </div>

              <div className="d-flex justify-content-between text-white mb-2">
                <span>Dto. Cupón (10%):</span> <span className="text-success fw-bold">-${couponDiscount.toFixed(0)}</span>
              </div>
              <div className="d-flex justify-content-between text-white mb-2">
                <span>Dto. Pago (5%):</span> <span className="text-success fw-bold">-${paymentDiscount.toFixed(0)}</span>
              </div>
              <hr className="border-light" />
              <div className="d-flex justify-content-between text-white fs-4 fw-bold">
                <span className="text-warning">Total:</span> <span>${total.toFixed(0)}</span>
              </div>

              {step === 'cart' ? (
                <Button variant="outdoor" className="btn-outdoor w-100 mt-4 py-2" onClick={() => setStep('payment')}>
                  Proceder al Pago
                </Button>
              ) : (
                <div className="mt-4">
                  <h5 className="text-white mb-3 text-center">Elige tu método:</h5>
                  <div className="d-grid gap-2">
                    <Button variant="outline-light" className="text-start px-3" onClick={() => setPaymentMethod('mp')}>
                      🛒 Mercado Pago
                    </Button>
                    <Button variant="outline-light" className="text-start px-3" onClick={() => setPaymentMethod('rut')}>
                      💳 Cuenta RUT
                    </Button>
                    <Button variant="outline-light" className="text-start px-3" onClick={() => setPaymentMethod('credit')}>
                      💳 Tarjeta Crédito (-5%)
                    </Button>
                  </div>
                  {paymentMethod && (
                    <div className="mt-3">
                      {paymentMethod === 'credit' && (
                        <input
                          type="text"
                          className="form-control mb-2 bg-dark text-white border-warning"
                          placeholder="Número de tarjeta (simulado)"
                        />
                      )}
                      <Button variant="success" className="w-100 fw-bold" onClick={() => setStep('summary')}>
                        Confirmar y Pagar
                      </Button>
                      <Button variant="link" className="w-100 text-warning text-decoration-none" onClick={() => setStep('cart')}>
                        Volver al carrito
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
