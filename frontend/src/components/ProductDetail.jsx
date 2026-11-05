import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel, Badge } from 'react-bootstrap';
import { ProductService } from '../services/dataService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // MAPEADO EXACTO de imágenes para asegurar que se vean
  const getProductImages = (productName) => {
    const mapping = {
      "Carpa 2 Personas": ["/img/carpa2personas/carpa2personas.jpg", "/img/carpa2personas/carpa2personas1.jpg"],
      "Chaquetón Montaña": ["/img/chaqueta/chaqueton_montaña1.jpg", "/img/chaqueta/chaqueton_montaña2.jpg", "/img/chaqueta/chaqueton_montaña3.jpg"],
      "Hamaca Reciclada": ["/img/hamaca/hamaca_reciclada.jpg", "/img/hamaca/hamaca_reciclada2.jpg"],
      "Filtro de Agua": ["/img/filtroagua/filtroagua1.jpg", "/img/filtroagua/filtroagua2.jpg"],
      "Linterna Solar": ["/img/linterna_solar/linternaSolar.jpg", "/img/linterna_solar/linternaSolar1.jpg"],
    };
    return mapping[productName] || ['https://via.placeholder.com/600x400?text=No+Image'];
  };

  // DEFINICIÓN MANUAL de sugerencias para evitar el azar y errores
  const getManualSuggestions = (productId) => {
    const suggestions = {
      1: [3, 4], // Carpa -> Hamaca y Filtro
      2: [1, 5], // Chaquetón -> Carpa y Linterna
      3: [4, 5], // Hamaca -> Filtro y Linterna
      4: [3, 5], // Filtro -> Hamaca y Linterna
      5: [1, 2], // Linterna -> Carpa y Chaquetón
    };
    return suggestions[productId] || [];
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const allProducts = await ProductService.getAll();
        const currentProduct = allProducts.find(p => p.id === parseInt(id));

        if (currentProduct) {
          setProduct(currentProduct);

          // Buscamos los productos sugeridos manualmente
          const suggestedIds = getManualSuggestions(currentProduct.id);
          const related = allProducts.filter(p => suggestedIds.includes(p.id));
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error cargando el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando detalles...</span>
        </div>
      </Container>
    );
  }

  if (!product) {
    return <Container className="text-center mt-5"><h2 className="catalog-title">Producto no encontrado</h2><Link to="/productos" className="btn btn-primary">Volver al catálogo</Link></Container>;
  }

  const images = getProductImages(product.name);

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <Carousel>
            {images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 rounded shadow detail-carousel-img"
                  src={img}
                  alt={`Vista ${index + 1} de ${product.name}`}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible'; }}
                />
                <Carousel.Caption>
                  <h3 className="text-white shadow-sm" style={{backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '10px', padding: '5px'}}>Vista {index + 1} la calidad outdoor</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <Badge bg="warning text-dark mb-2" style={{ width: 'fit-content' }}>{product.category}</Badge>
          <h1 className="catalog-title mb-3">{product.name}</h1>
          <h2 className="text-white mb-4">${product.price}</h2>
          <p className="fs-5 text-white-50 mb-4">
            {product.description || "Este equipamiento de alta calidad ha sido seleccionado para garantizar la máxima durabilidad en tus expediciones outdoor. Diseñado bajo estándares de sostenibilidad y resistencia."}
          </p>
          <Button variant="outdoor" className="btn-outdoor btn-lg w-100 mb-3">
            Agregar al Carrito
          </Button>
          <Link to="/productos" className="text-warning text-decoration-none">← Volver al catálogo</Link>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="catalog-title mb-4">También te podría interesar</h3>
          <Row>
            {relatedProducts.length > 0 ? (
              relatedProducts.map(relProd => {
                // También aplicamos el mapeo de imágenes aquí para que se vean en las sugerencias
                const relImages = getProductImages(relProd.name);
                return (
                  <Col key={relProd.id} sm={12} md={4} className="mb-4">
                    <Card className="h-100 shadow-sm product-card">
                      <Card.Img
                        variant="top"
                        src={relImages[0]}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{relProd.name}</Card.Title>
                        <div className="mt-auto">
                          <Link to={`/producto/${relProd.id}`} className="btn btn-outline-warning w-100">Ver más</Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col className="text-center">
                <p className="text-white-50">No hay productos similares en este momento.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
