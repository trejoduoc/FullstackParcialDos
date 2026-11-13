import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { nombre, apellido, email, mensaje } = formData;
    if (!nombre || !apellido || !email || !mensaje) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Simular envío exitoso
    setEnviado(true);
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });

    setTimeout(() => setEnviado(false), 5000);
  };

  const inputStyle = {
    backgroundColor: 'rgba(255, 248, 225, 0.1)',
    borderColor: 'var(--ocre-arcilla)',
    color: 'var(--blanco-crema)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontSize: '1rem'
  };

  const labelStyle = {
    color: 'var(--blanco-crema)',
    fontWeight: '500',
    marginBottom: '0.5rem'
  };

  return (
    <Container className="contacto-page py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="contacto-card rounded shadow">
            <div className="contacto-header text-center mb-4">
              <h2 className="catalog-title mb-2">Contáctanos</h2>
              <p className="contacto-description">
                Déjanos tus datos y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>

            {enviado && (
              <Alert
                dismissible
                onClose={() => setEnviado(false)}
                className="contacto-alert-success mb-4"
              >
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </Alert>
            )}

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError('')} className="mb-4">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} className="contacto-form">
              <Row className="g-4">
                {/* Fila 1: Nombre y Apellido */}
                <Col md={6}>
                  <Form.Group controlId="contactoNombre">
                    <Form.Label style={labelStyle}>
                      Nombre <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="contactoApellido">
                    <Form.Label style={labelStyle}>
                      Apellido <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      placeholder="Tu apellido"
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                {/* Fila 2: Email y Teléfono */}
                <Col md={6}>
                  <Form.Group controlId="contactoEmail">
                    <Form.Label style={labelStyle}>
                      Correo electrónico <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="contactoTelefono">
                    <Form.Label style={labelStyle}>
                      Teléfono
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+52 123 456 7890"
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                {/* Fila 3: Asunto */}
                <Col xs={12}>
                  <Form.Group controlId="contactoAsunto">
                    <Form.Label style={labelStyle}>
                      Asunto
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      style={inputStyle}
                    />
                  </Form.Group>
                </Col>

                {/* Fila 4: Mensaje */}
                <Col xs={12}>
                  <Form.Group controlId="contactoMensaje">
                    <Form.Label style={labelStyle}>
                      Mensaje <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="mensaje"
                      rows={6}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </Form.Group>
                </Col>

                {/* Fila 5: Botón */}
                <Col xs={12} className="text-center mt-4">
                  <Button
                    type="submit"
                    className="btn-outdoor contacto-btn"
                  >
                    Enviar Solicitud
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
