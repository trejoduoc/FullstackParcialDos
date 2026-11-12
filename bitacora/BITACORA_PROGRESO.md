# BITÁCORA DE PROGRESO - PROYECTO NOMADICO OUTDOOR
Fecha de inicio: 2026-11-03
Estado actual: ✅ **Parcial 2 completada** — Versión final entregada (2026-11-11)

## 1. OBJETIVO DEL PROYECTO
Migrar una tienda de equipamiento outdoor de HTML/CSS/JS plano a una aplicación moderna en React, integrando Bootstrap para responsividad, un sistema de persistencia de datos simulado (CRUD) y pruebas unitarias (la pauta menciona Jasmine/Karma; se implementó con Vitest por compatibilidad con Vite 8).

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

### D. Entorno de Pruebas (2026-11-11)
- [x] Intento con Karma: `karma-vite` solo soporta Vite 2 a 5 y el proyecto usa Vite 8, por lo que `npm install` falló con error `ERESOLVE` (no se usó `--force` para no instalar una configuración rota).
- [x] Decisión: usar **Vitest**, el test runner nativo de Vite, con sintaxis equivalente a Jasmine (`describe`, `it`, `expect`).
- [x] Script `"test": "vitest run"` agregado en `package.json`.
- [x] Prueba base `src/ejemplo.spec.js` ejecutada con éxito (1 de 1).
- [x] Aprendido: Vitest solo detecta archivos `*.spec.js` / `*.test.js`, y en entorno de pruebas `localStorage` no existe, por lo que se simula con `vi.stubGlobal`.

## 3. CONCEPTOS CLAVE TRABAJADOS (Para Repaso)
- **Componentes**: Piezas de LEGO de la interfaz (Single Responsibility).
- **JSX**: Extensión de sintaxis de JavaScript que permite escribir HTML dentro de JS.
- **CRUD**: Operaciones fundamentales de cualquier base de datos.
- **Persistencia**: Capacidad de guardar datos para que no se pierdan al cerrar el navegador.
- **Pruebas unitarias**: Verifican una pieza de lógica de forma aislada. Patrón Arrange-Act-Assert (preparar, ejecutar, verificar).
- **Mock / stub**: Reemplazo de una dependencia real (como `localStorage`) por una versión falsa y controlada para las pruebas.
- **Vitest vs Karma/Jasmine**: Vitest es el runner nativo de Vite; Jasmine define aserciones y Karma ejecuta en navegador. Mismo objetivo, distinta herramienta.

## 4. TAREAS COMPLETADAS (Parcial 2)
- [x] **Paso A**: Componente `Navbar.jsx` implementado con gestión de estado de usuario y roles.
- [x] **Paso B**: Vista de Productos (`ProductList.jsx`) conectada al `ProductService` con filtrado por categoría.
- [x] **Paso C**: Carrito de Compras (`Cart.jsx`) implementado con gestión de cantidades, cupón de descuento y cálculo de totales.
- [x] **Paso D**: Panel de Administrador (`AdminPanel.jsx`) para gestionar el inventario con CRUD completo y autenticación por roles.
- [x] **Paso E**: Entorno de pruebas configurado con Vitest. Prueba base (`ejemplo.spec.js`) ejecutada con éxito. Se documentó la decisión de no usar Jasmine/Karma por incompatibilidad con Vite 8.
- [x] **Componentes adicionales**: `Home.jsx`, `ProductDetail.jsx`, `Chatbot.jsx`, `Footer.jsx` implementados y funcionando.
- [x] **Documentación**: README actualizado, bitácora de progreso y guion de presentación completados.

## 5. LECCIONES APRENDIDAS
- **Vite 8 y Karma**: `karma-vite` no soporta Vite 8 (solo Vite 2-5). Vitest es la alternativa nativa recomendada.
- **localStorage en tests**: En entorno de pruebas, `localStorage` no existe y debe simularse con `vi.stubGlobal`.
- **Arquitectura SPA**: La migración de HTML plano a React demostró los beneficios de componentes reutilizables y gestión centralizada de datos.
- **Servicio de datos**: Patrón CRUD con LocalStorage permite simular persistencia sin backend, ideal para prototipos y evaluaciones.

---
*Nota: El usuario está siguiendo el proceso paso a paso para aprender a enseñar el código posteriormente.*
