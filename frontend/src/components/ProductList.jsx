import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductService } from '../services/dataService';

export const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('nomadico_cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('nomadico_cart', JSON.stringify(cart));
    return true;
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProductId, setActiveProductId] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const getProductImages = (productName) => {
    const mapping = {
      "Carpa 2 Personas": ["/img/carpa2personas/carpa2personas.jpg", "/img/carpa2personas/carpa2personas1.jpg"],
      "Chaquetón Montaña": ["/img/chaqueta/chaqueton_montaña1.jpg", "/img/chaqueta/chaqueton_montaña2.jpg", "/img/chaqueta/chaqueton_montaña3.jpg"],
      "Hamaca Reciclada": ["/img/hamaca/hamaca_reciclada.jpg", "/img/hamaca/hamaca_reciclada2.jpg"],
      "Filtro de Agua": ["/img/filtroagua/filtroagua1.jpg", "/img/filtroagua/filtroagua2.jpg"],
      "Linterna Solar": ["/img/linterna_solar/linternaSolar.jpg", "/img/linterna_solar/linternaSolar1.jpg"],
    };
    return mapping[productName] || ['https://via.placeholder.com/300x200?text=No+Image'];
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`¡${product.name} añadido al carrito!`);
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {notification && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 9999 }}>
          <Badge bg="success" className="p-3 shadow-lg" style={{ fontSize: '1.2rem', animation: 'fadeInDown 0.5s' }}>
            {notification}
          </Badge>
        </div>
      )}
      <h2 className="text-center my-4 catalog-title">Nuestro Catálogo Outdoor</h2>
      <Row>
        {products.length > 0 ? (
          products.map(product => {
            const images = getProductImages(product.name);
            const isHovered = activeProductId === product.id;

            return (
              <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm product-card">
                  <div
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onMouseEnter={() => {
                      setActiveProductId(product.id);
                      setHoveredImageIndex(0);
                    }}
                    onMouseLeave={() => setActiveProductId(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const width = rect.width;
                      const index = Math.floor((x / width) * images.length);
                      setHoveredImageIndex(index);
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={isHovered ? images[hoveredImageIndex] : images[0]}
                      style={{ transition: 'opacity 0.2s ease' }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                    />
                    {isHovered && images.length > 1 && (
                      <div className="position-absolute bottom-0 start-0 w-100 p-2 text-center"
                           style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '12px', pointerEvents: 'none' }}>
                        Desliza para ver {images.length} fotos
                      </div>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="card-text">
                      {product.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 mb-0 text-white">${product.price}</span>
                        <Badge bg="warning text-dark">{product.category}</Badge>
                      </div>
                      <div className="d-flex gap-2">
                        <Link to={`/producto/${product.id}`} className="btn btn-outline-warning w-50">
                          Detalles
                        </Link>
                        <Button variant="outdoor" className="btn-outdoor w-50" onClick={() => handleAddToCart(product)}>
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col className="text-center">
            <p className="lead">No hay productos disponibles en este momento.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
