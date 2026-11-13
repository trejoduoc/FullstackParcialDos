import React, { useState, useEffect, useRef } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy tu Guía Outdoor 🌲. ¿En qué puedo ayudarte hoy?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const generateResponse = (text) => {
    const input = text.toLowerCase();

    // Mapeo de productos con sus IDs reales para generar links
    const productLinks = {
      carpa: { name: "Carpa 2 Personas", id: 1, desc: "impermeables y perfectas para climas fríos" },
      chaqueta: { name: "Chaquetón Montaña", id: 2, desc: "térmico y reacondicionado, ¡calidad pro!" },
      chaqueton: { name: "Chaquetón Montaña", id: 2, desc: "térmico y reacondicionado, ¡calidad pro!" },
      hamaca: { name: "Hamaca Reciclada", id: 3, desc: "hechas de hilo reciclado y súper cómodas" },
      filtro: { name: "Filtro de Agua", id: 4, desc: "portátil y de alta eficiencia" },
      linterna: { name: "Linterna Solar", id: 5, desc: "con carga solar rápida" },
    };

    // Buscar si el input contiene alguna palabra clave de producto
    for (const key in productLinks) {
      if (input.includes(key)) {
        const p = productLinks[key];
        return {
          text: `¡Sí! Tenemos el ${p.name}. Son ${p.desc}.`,
          link: `/producto/${p.id}`,
          linkText: "Ver producto aquí 🌲"
        };
      }
    }

    if (input.includes('codigo') || input.includes('react') || input.includes('como hacer')) {
      return {
        text: "Como guía de la tienda, te recomiendo estudiar los 'Hooks' de React (useState y useEffect). ¡Es la base de este proyecto!",
        isBot: true
      };
    }

    return {
      text: "No estoy seguro de eso, pero puedo ayudarte a encontrar equipo outdoor. ¿Buscas carpas, chaquetas o linternas?",
      isBot: true
    };
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="chatbot-icon">{isOpen ? '✖' : '🌲'}</span>
        {!isOpen && <Badge bg="danger" className="chatbot-badge">1</Badge>}
      </div>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h5 className="m-0 text-white">Guía Outdoor 🌲</h5>
            <small className="text-white-50">En línea</small>
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-wrapper ${msg.isBot !== false ? 'bot' : 'user'}`}>
                <div className="message-bubble">
                  <div>{msg.text}</div>
                  {msg.link && (
                    <div className="mt-2">
                      <Link to={msg.link} className="btn btn-sm btn-warning fw-bold" style={{ fontSize: '12px' }}>
                        {msg.linkText}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Pregunta algo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
