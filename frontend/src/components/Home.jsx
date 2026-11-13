import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="text-center text-white">
      <header className="mb-5">
        <h1 className="display-4 catalog-title">Bienvenidos a Nomadico Outdoor</h1>
        <p className="lead">Equipamiento profesional para tus aventuras al aire libre.</p>
      </header>

      <section className="mb-5">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid var(--ocre-arcilla)' }}>
          <p className="fs-5">
            Es una tienda especializada en equipamiento para camping, senderismo y vida al aire libre,
            con un enfoque basado en la economía circular y el consumo responsable.
          </p>
          <p className="fs-5">
            Nuestro propósito es facilitar el acceso a productos outdoor de calidad, reduciendo al mismo tiempo
            el impacto ambiental asociado a la fabricación y al consumo de equipamiento.
          </p>
        </div>
      </section>

      <section className="mb-5">
        <h3 className="catalog-title mb-3">Nuestras Especialidades</h3>
        <Row className="g-3">
          {['Alquiler de carpas', 'Prendas de montaña reacondicionadas', 'Hamacas de hilo reciclado', 'Filtros de agua portátiles', 'Linternas de carga solar'].map((item, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <div className="p-3 rounded border border-warning text-white" style={{ backgroundColor: 'rgba(30, 58, 43, 0.6)' }}>
                {item}
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5">
        <h3 className="catalog-title mb-3">¡Conoce nuestra tienda!</h3>
        <div className="ratio ratio-16x9 mx-auto" style={{ maxWidth: '800px' }}>
          <iframe
            src="https://www.youtube.com/embed/iys_pmJSp9M?si=I6gs9zg3bKMyytTD"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </Container>
  );
};

export default Home;
