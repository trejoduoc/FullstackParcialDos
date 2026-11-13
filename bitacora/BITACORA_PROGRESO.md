# BITÁCORA DE PROGRESO - PROYECTO NOMADICO OUTDOOR
Fecha de inicio: 2026-11-03
Estado actual: ✅ **Parcial 2 completada** — Versión final entregada (2026-11-13)

## 1. OBJETIVO DEL PROYECTO
Migrar una tienda de equipamiento outdoor de HTML/CSS/JS plano a una aplicación moderna en React, integrando Bootstrap para responsividad, un sistema de persistencia de datos simulado (CRUD) y pruebas unitarias con **Jasmine/Karma** según la pauta académica.

## 2. HITOS COMPLETADOS

### A. Análisis y Planificación
- [x] Lectura y análisis de la pauta académica (PDFs).
- [x] Identificación de requerimientos obligatorios: Migración a React, CRUD en JS, Bootstrap, Vistas de Admin/Checkout y Testing.
- [x] Definición de la hoja de ruta paso a paso para el aprendizaje y la implementación.

### B. Documentación de Defensa
- [x] Creación de `GUION_PRESENTACION.txt`: Documento estructurado con los argumentos técnicos para la defensa oral frente al docente (conceptos de SPA, Single Responsibility, CRUD y Testing).

### C. Capa de Datos (Persistencia)
- [x] Implementación de `script/dataService.js`:
    - Creación de un servicio de datos simulado.
    - Implementación de operaciones CRUD completas (Create, Read, Update, Delete).
    - Integración con `LocalStorage` para persistencia de datos entre recargas de página.

### D. Entorno de Pruebas (2026-11-11 a 2026-11-13)
- [x] Intento inicial con Karma + Vite: `karma-vite` solo soporta Vite 2 a 5, error `ERESOLVE`.
- [x] Primera alternativa: se probó **Vitest** como test runner nativo de Vite.
- [x] **Migración de Vite a Webpack 5**: Para cumplir con la pauta académica (Jasmine/Karma), se eliminó Vite y se configuró Webpack 5 con Babel para procesar JSX/React.
- [x] Configuración de **Jasmine + Karma** con `karma-webpack` para procesar los tests con Webpack.
- [x] Karma configurado con Edge en modo headless (`karma.conf.js`).
- [x] Script `"test": "karma start karma.conf.js"` en `package.json`.
- [x] Tests actualizados a sintaxis Jasmine nativa (sin imports de Vitest).
- [x] Tests en `src/__tests__/app.spec.js`: 10 pruebas para Contacto y Carrito.
- [x] Tests en `script/dataService.spec.js`: 7 pruebas CRUD del ProductService.
- [x] Prueba base `src/ejemplo.spec.js` con Jasmine nativo.
- [x] Aprendido: Karma ejecuta tests en navegador real (headless), Jasmine usa `describe`, `it`, `expect` globales sin imports. Para mockear `localStorage` en Karma se usa `window.localStorage` directamente.

## 3. CONCEPTOS CLAVE TRABAJADOS (Para Repaso)
- **Componentes**: Piezas de LEGO de la interfaz (Single Responsibility).
- **JSX**: Extensión de sintaxis de JavaScript que permite escribir HTML dentro de JS.
- **CRUD**: Operaciones fundamentales de cualquier base de datos.
- **Persistencia**: Capacidad de guardar datos para que no se pierdan al cerrar el navegador.
- **Pruebas unitarias**: Verifican una pieza de lógica de forma aislada. Patrón Arrange-Act-Assert (preparar, ejecutar, verificar).
- **Mock / stub**: Reemplazo de una dependencia real (como `localStorage`) por una versión falsa y controlada para las pruebas.
- **Jasmine + Karma**: Jasmine proporciona la sintaxis de pruebas (`describe`, `it`, `expect`) y Karma ejecuta los tests en un navegador real (headless). Juntos cumplen el requisito académico de testing en navegador.
- **Webpack**: Bundler que procesa JSX con Babel y permite usar Karma con código React mediante `karma-webpack`.
- **Vite vs Webpack**: Vite es más rápido pero incompatible con Karma en versiones recientes. Webpack es más versátil y compatible con el ecosistema de Karma.

## 4. TAREAS COMPLETADAS (Parcial 2)
- [x] **Paso A**: Componente `Navbar.jsx` implementado con gestión de estado de usuario y roles.
- [x] **Paso B**: Vista de Productos (`ProductList.jsx`) conectada al `ProductService` con filtrado por categoría.
- [x] **Paso C**: Carrito de Compras (`Cart.jsx`) implementado con gestión de cantidades, cupón de descuento y cálculo de totales.
- [x] **Paso D**: Panel de Administrador (`AdminPanel.jsx`) para gestionar el inventario con CRUD completo y autenticación por roles.
- [x] **Paso E**: Entorno de pruebas configurado con **Jasmine + Karma** sobre Webpack 5. Se migró de Vite a Webpack para cumplir con la pauta académica. Tests ejecutados en Edge headless.
- [x] **Componentes adicionales**: `Home.jsx`, `ProductDetail.jsx`, `Chatbot.jsx`, `Footer.jsx` implementados y funcionando.
- [x] **Documentación**: README actualizado, bitácora de progreso y guion de presentación completados.

## 5. LECCIONES APRENDIDAS
- **Vite y Karma**: `karma-vite` no soporta Vite 6+ (solo Vite 2-5). La solución fue migrar a Webpack 5 para usar Karma + Jasmine según la pauta.
- **localStorage en tests con Karma**: En el navegador headless de Karma, `localStorage` existe pero se puede mockear con `window.localStorage` para aislar cada prueba.
- **Jasmine nativo**: A diferencia de Vitest, Jasmine no requiere imports — `describe`, `it`, `expect` son globales del navegador.
- **Webpack para React**: Configurar Babel con `@babel/preset-react` y `@babel/preset-env` permite procesar JSX y código moderno en Webpack.
- **Arquitectura SPA**: La migración de HTML plano a React demostró los beneficios de componentes reutilizables y gestión centralizada de datos.
- **Servicio de datos**: Patrón CRUD con LocalStorage permite simular persistencia sin backend, ideal para prototipos y evaluaciones.

---
*Nota: El usuario está siguiendo el proceso paso a paso para aprender a enseñar el código posteriormente.*
