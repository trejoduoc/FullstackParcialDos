# Nomadico Outdoor - Tienda de Equipamiento Outdoor

Proyecto desarrollado para la asignatura de **Fullstack II** (Sección 001D).

**Estado**: ✅ **Parcial 2 completada** — Versión final entregada.

## 🚀 Descripción General
Este proyecto consiste en la migración de una tienda de equipamiento outdoor desde una arquitectura de HTML/CSS/JS plano hacia una aplicación moderna basada en **React**. El objetivo es implementar una Single Page Application (SPA) que permita una gestión eficiente de productos, carrito de compras y un panel administrativo con control de acceso.

## 🛠️ Stack Tecnológico
- **Frontend**: React.js con Webpack 5
- **Estilos**: Bootstrap 5 / CSS3 Personalizado
- **Persistencia**: LocalStorage (Simulación de base de datos mediante un Servicio de Datos CRUD)
- **Testing**: Jasmine + Karma (ejecución en navegador headless con Edge)

## 📋 Funcionalidades Implementadas
- [x] **Capa de Datos**: Servicio CRUD completo para gestión de productos y persistencia en LocalStorage.
- [x] **Navegación**: Componente Navbar responsivo con gestión de estado de usuario.
- [x] **Catálogo**: Vista de productos dinámica conectada al servicio de datos.
- [x] **Detalle de Producto**: Vista individual con información completa y opción de agregar al carrito.
- [x] **Carrito**: Flujo de selección de productos, gestión de cantidades y cupón de descuento.
- [x] **Admin**: Panel de gestión de inventario (Crear, Editar, Eliminar productos) con sistema de autenticación y roles (Admin/User).
- [x] **Chatbot**: Asistente virtual integrado para consultas de usuarios.
- [x] **Footer**: Pie de página con información de contacto y enlaces.
- [x] **Experiencia de Usuario (UX)**: Interfaz optimizada con colores temáticos y transiciones fluidas.
- [x] **Pruebas unitarias**: Configuración de Jasmine + Karma con pruebas ejecutadas en navegador headless (Edge).

## ⚠️ Nota sobre Testing
La pauta académica solicitaba Jasmine y Karma como framework de pruebas. Inicialmente el proyecto usó Vite, pero se detectó que `karma-vite` solo soporta Vite 2 a 5. Para cumplir con la pauta, se migró el proyecto de Vite a **Webpack 5**, que es compatible con `karma-webpack`. Así se logró usar **Jasmine + Karma** tal como se requería. La configuración incluye `karma.conf.js` con Webpack para procesar JSX/Babel, y se ejecuta con Edge en modo headless. El script `"test": "karma start karma.conf.js"` en `package.json` corre las pruebas con `npm test`.

## 📁 Estructura del Proyecto
```
├── frontend/
│   ├── src/
│   │   ├── __tests__/        # Pruebas unitarias Jasmine (app.spec.js)
│   │   ├── components/       # Componentes React (Navbar, Home, ProductList, etc.)
│   │   ├── services/         # Servicio de datos CRUD (dataService.js)
│   │   ├── App.jsx           # Componente principal con rutas
│   │   ├── main.jsx          # Punto de entrada de la aplicación
│   │   └── ejemplo.spec.js   # Prueba unitaria base con Jasmine
│   ├── karma.conf.js         # Configuración de Karma con Webpack
│   └── package.json
├── script/
│   ├── dataService.js        # Servicio de datos CRUD
│   └── dataService.spec.js   # Pruebas unitarias del servicio de datos
├── bitacora/                 # Documentación de progreso y guiones de presentación
├── index.html                # Página principal (versión HTML original)
├── productos.html            # Catálogo de productos (versión HTML original)
├── contacto.html             # Formulario de contacto (versión HTML original)
├── styles/                   # Hojas de estilo CSS
└── img/                      # Imágenes y recursos estáticos
```

## 👥 Integrantes
- Luis Cifuentes Paves
- Leonard Hernandez
- Matias Pinto Barria
- Sebastián Trejo Venegas

---
**Docente**: Roberto Osses Vecchi

**Fecha de entrega**: Noviembre 2026
