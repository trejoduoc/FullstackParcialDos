# Especificación Técnica - Proyecto Nomadico Outdoor

Este documento detalla la arquitectura y las decisiones técnicas implementadas en la aplicación Nomadico Outdoor, sirviendo como base para el informe técnico.

## 1. Arquitectura del Sistema
El proyecto sigue una arquitectura de **Componentes Desacoplados** basada en React, separando la lógica de datos de la interfaz de usuario.

### 1.1 Capa de Presentación (Frontend)
- **Framework**: React.js utilizando Vite para un desarrollo rápido y optimizado.
- **Gestión de Estado**: Uso de `useState` y `useEffect` para el manejo de datos locales y persistencia.
- **Diseño**: Basado en Bootstrap 5 con una capa de CSS personalizada para implementar la identidad visual (Paleta: Verde Pino, Ocre Arcilla, Sol Dorado).

### 1.2 Capa de Datos (Service Layer)
Se implementó un patrón de **Servicio de Datos (`ProductService`)** que actúa como intermediario entre los componentes y la fuente de datos.
- **Persistencia**: Utilización de `localStorage` para simular una base de datos NoSQL, permitiendo que los cambios (CRUD) persistan tras recargar la página.
- **Operaciones**:
    - `getAll()`: Recupera la lista completa de productos.
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

## 3. Flujos de Trabajo (Procedimientos)
1. **Flujo de Usuario**: Landing Page $\rightarrow$ Catálogo $\rightarrow$ Detalle de Producto $\rightarrow$ Agregar al Carrito $\rightarrow$ Checkout.
2. **Flujo Administrativo**: Acceso Sistema $\rightarrow$ Login $\rightarrow$ Gestión de Inventario (CRUD) $\rightarrow$ Actualización de Catálogo en tiempo real.

## 4. Consideraciones Técnicas
- **Rendimiento**: Uso de `setInterval` y eventos de `storage` en el Navbar para asegurar que el contador del carrito y el usuario estén sincronizados en todas las pestañas abiertas.
- **Legibilidad**: Aplicación de sombras y contrastes específicos en CSS para asegurar que la tipografía sea legible sobre fondos oscuros y texturas.
