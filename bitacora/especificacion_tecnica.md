# Especificación Técnica - Proyecto Nomadico Outdoor

Este documento detalla la arquitectura y las decisiones técnicas implementadas en la aplicación Nomadico Outdoor, sirviendo como base para el informe técnico.

## 1. Arquitectura del Sistema
El proyecto sigue una arquitectura de **Componentes Desacoplados** basada en React, separando la lógica de datos de la interfaz de usuario.

### 1.1 Capa de Presentación (Frontend)
- **Framework**: React.js utilizando Webpack 5 para bundling y desarrollo.
- **Gestión de Estado**: Uso de `useState` y `useEffect` para el manejo de datos locales y persistencia.
- **Diseño**: Basado en Bootstrap 5 con una capa de CSS personalizada para implementar la identidad visual (Paleta: Verde Pino, Ocre Arcilla, Sol Dorado).

### 1.2 Capa de Datos (Service Layer)
Se implementó un patrón de **Servicio de Datos (`ProductService`)** que actúa como intermediario entre los componentes y la fuente de datos.
- **Persistencia**: Utilización de `localStorage` para simular una base de datos NoSQL, permitiendo que los cambios (CRUD) persistan tras recargar la página.
- **Operaciones**:
    - `getAll()`: Recupera la lista completa de productos.
    - `getById(id)`: Recupera un producto por su identificador.
    - `create(product)`: Agrega un nuevo producto al almacenamiento.
    - `update(id, product)`: Modifica la información de un producto existente.
    - `delete(id)`: Elimina un producto mediante su identificador único.

## 2. Módulos Implementados

### 2.1 Sistema de Autenticación y Roles
Implementación de un flujo de acceso basado en roles para el `AdminPanel`:
- **Roles**: `admin` (Acceso total al inventario) y `user` (Acceso a área personal).
- **Seguridad**: Validación de credenciales mediante un mock de datos y almacenamiento de la sesión en `localStorage`.
- **UX de Sesión**: El Navbar reacciona dinámicamente al estado del usuario, cambiando el botón de "Iniciar Sesión" por el saludo personalizado del usuario activo.

### 2.2 Panel Administrativo
Módulo dedicado a la gestión del catálogo:
- **Formulario Dinámico**: Soporta tanto la creación de nuevos productos como la edición de existentes mediante el control de un `editingId`.
- **Gestión de Inventario**: Tabla interactiva con opciones de edición y eliminación inmediata.

### 2.3 Catálogo y Carrito
- **Renderizado Dinámico**: Los productos se cargan desde el `ProductService` y se muestran en una cuadrícula responsiva.
- **Lógica de Carrito**: Implementación de un sistema de conteo y almacenamiento de productos seleccionados, reflejado en tiempo real en el Navbar mediante un `Badge`.

### 2.4 Pruebas Unitarias
Se incorporó un entorno de pruebas con **Jasmine + Karma** para validar la lógica de la aplicación, cumpliendo con la pauta académica.
- **Herramienta**: Jasmine (framework de aserciones) + Karma (test runner en navegador). Inicialmente el proyecto usó Vite, pero `karma-vite` solo soporta Vite 2-5. Para resolver esto, se migró a **Webpack 5** con `karma-webpack`, logrando usar Jasmine/Karma tal como se requería.
- **Configuración**: `karma.conf.js` con Webpack para procesar JSX/Babel, lanzador Edge en modo headless, y el script `"test": "karma start karma.conf.js"` en `package.json`. Se ejecuta con `npm test`.
- **Archivos de prueba**:
  - `frontend/src/__tests__/app.spec.js`: 10 pruebas para componentes de Contacto y Carrito.
  - `frontend/src/ejemplo.spec.js`: Prueba base con Jasmine nativo.
  - `script/dataService.spec.js`: 7 pruebas CRUD del ProductService.
- **Aislamiento**: `localStorage` se mockea con `window.localStorage` en cada `beforeEach`, de modo que ningún test dependa de los datos de otro.
- **Patrón**: cada prueba sigue Arrange-Act-Assert (preparar, ejecutar, verificar).
- **Sintaxis Jasmine**: `describe`, `it`, `expect` son globales del navegador (sin imports), a diferencia de Vitest que requiere imports explícitos.

## 3. Flujos de Trabajo (Procedimientos)
1. **Flujo de Usuario**: Landing Page $\rightarrow$ Catálogo $\rightarrow$ Detalle de Producto $\rightarrow$ Agregar al Carrito $\rightarrow$ Checkout.
2. **Flujo Administrativo**: Acceso Sistema $\rightarrow$ Login $\rightarrow$ Gestión de Inventario (CRUD) $\rightarrow$ Actualización de Catálogo en tiempo real.

## 4. Consideraciones Técnicas
- **Rendimiento**: Uso de `setInterval` y eventos de `storage` en el Navbar para asegurar que el contador del carrito y el usuario estén sincronizados en todas las pestañas abiertas.
- **Legibilidad**: Aplicación de sombras y contrastes específicos en CSS para asegurar que la tipografía sea legible sobre fondos oscuros y texturas.
