# BITÁCORA DE PROGRESO - PROYECTO NOMADICO OUTDOOR
Fecha de inicio: 2026-11-03
Estado actual: Fase de Migración a React / Setup Inicial

## 1. OBJETIVO DEL PROYECTO
Migrar una tienda de equipamiento outdoor de HTML/CSS/JS plano a una aplicación moderna en React, integrando Bootstrap para responsividad, un sistema de persistencia de datos simulado (CRUD) y pruebas unitarias con Jasmine/Karma.

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

## 3. CONCEPTOS CLAVE TRABAJADOS (Para Repaso)
- **Componentes**: Piezas de LEGO de la interfaz (Single Responsibility).
- **JSX**: Extensión de sintaxis de JavaScript que permite escribir HTML dentro de JS.
- **CRUD**: Operaciones fundamentales de cualquier base de datos.
- **Persistencia**: Capacidad de guardar datos para que no se pierdan al cerrar el navegador.

## 4. PENDIENTES PARA LA PRÓXIMA SESIÓN
- [ ] **Paso A**: Finalizar la implementación del primer componente (`Navbar.jsx`).
- [ ] **Paso B**: Crear la Vista de Productos conectada al `ProductService`.
- [ ] **Paso C**: Implementar el Carrito de Compras y el flujo de Checkout.
- [ ] **Paso D**: Desarrollar el Panel de Administrador para gestionar el inventario.
- [ ] **Paso E**: Configuración de entorno de pruebas (Jasmine + Karma) y creación de los 10 tests unitarios.

---
*Nota: El usuario está siguiendo el proceso paso a paso para aprender a enseñar el código posteriormente.*
