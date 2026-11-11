# 🌲 GUION COMPLETO DE PRESENTACIÓN — NOMADICO OUTDOOR

**Evaluación Parcial 2 — Fullstack II**  
**Integrante:** Sebastián Trejo Venegas  
**Fecha:** 11 de noviembre de 2026

---

## 📋 ÍNDICE

1. [Guion de Presentación Oral](#1-guion-de-presentación-oral)
2. [Demo en Vivo — Pasos a Seguir](#2-demo-en-vivo--pasos-a-seguir)
3. [Preguntas del Profesor — Respuestas y Validadores](#3-preguntas-del-profesor--respuestas-y-validadores)
4. [Pruebas Jasmine/Karma — Guía](#4-pruebas-jasminekarma--guía)
5. [Conceptos Clave para Repasar](#5-conceptos-clave-para-repasar)

---

## 1. GUION DE PRESENTACIÓN ORAL>  Or type your own an

### 1.1 Introducción y Concepto del Proyecto

> "Buen día, mi nombre es Sebastián Trejo y les presento **Nomadico Outdoor**, una tienda especializada en equipamiento para camping y senderismo. El núcleo del negocio es la **economía circular**: promovemos el consumo responsable mediante el **alquiler** y la **venta de productos reacondicionados**."

**Puntos clave:**
- Tienda de equipamiento outdoor (carpas, chaquetas, hamacas, filtros de agua, linternas solares).
- Enfoque en sostenibilidad y economía circular.
- Productos: Alquiler, Reacondicionado, Accesorios.

---

### 1.2 Migración Tecnológica: HTML → React

> "Para esta evaluación, el cambio más importante fue la **migración de un sitio web estático en HTML plano** a una **aplicación moderna en React**. El sitio original usaba archivos HTML independientes (`index.html`, `productos.html`, `contacto.html`) con JavaScript vanilla. Ahora es una **SPA (Single Page Application)** construida con React y Vite."

**¿Por qué React?**

1. **Escalabilidad:** El sitio ahora se basa en **componentes reutilizables**. Si necesito cambiar una tarjeta de producto, lo hago en un solo lugar.
2. **Experiencia de Usuario:** Al ser una SPA, la navegación es **instantánea** sin recargar la página.
3. **Mantenibilidad:** Código organizado en componentes con responsabilidad única.

**Código clave — Estructura de rutas en `App.jsx`:**

```jsx
// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}
```

**Palabras clave:** `BrowserRouter`, `Routes`, `Route`, `element`, SPA, Vite.

---

### 1.3 Arquitectura de Componentes

> "He aplicado el principio de **Single Responsibility** (Responsabilidad Única). Cada componente tiene una función clara:"

| Componente | Responsabilidad | Archivo |
|---|---|---|
| `Navbar` | Navegación, carrito, sesión de usuario | `components/Navbar.jsx` |
| `Home` | Página de inicio con info del negocio | `components/Home.jsx` |
| `ProductList` | Catálogo de productos con grid | `components/ProductList.jsx` |
| `ProductDetail` | Vista detallada con carrusel de imágenes | `components/ProductDetail.jsx` |
| `Cart` | Carrito de compras con checkout | `components/Cart.jsx` |
| `AdminPanel` | Panel admin con login y CRUD | `components/AdminPanel.jsx` |
| `Chatbot` | Asistente virtual integrado | `components/Chatbot.jsx` |

**Código clave — Componente atómico (ProductList):**

```jsx
// frontend/src/components/ProductList.jsx
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await ProductService.getAll();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);
  // ... renderizado con products.map()
};
```

**Palabras clave:** `useState`, `useEffect`, `ProductService`, `map()`, Single Responsibility.

---

### 1.4 Gestión de Datos y Persistencia (CRUD)

> "Para simular una base de datos real, implementé un **Data Service** que gestiona la persistencia mediante **LocalStorage**. Este servicio expone operaciones CRUD completas:"

**Código clave — Servicio de datos:**

```javascript
// frontend/src/services/dataService.js

const STORAGE_KEY = 'nomadico_products';

export const ProductService = {
    // READ: Obtener todos los productos
    getAll: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : initialProducts;
    },

    // CREATE: Agregar un nuevo producto
    create: (product) => {
        const products = loadFromLocalStorage();
        const newProduct = { ...product, id: Date.now() };
        products.push(newProduct);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        return newProduct;
    },

    // UPDATE: Actualizar un producto existente
    update: (id, updatedData) => {
        const products = loadFromLocalStorage();
        const index = products.findIndex(p => p.id === parseInt(id));
        products[index] = { ...products[index], ...updatedData };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        return products[index];
    },

    // DELETE: Eliminar un producto
    delete: (id) => {
        let products = loadFromLocalStorage();
        const filtered = products.filter(p => p.id !== parseInt(id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return { success: true };
    }
};
```

**Palabras clave:** `localStorage`, `JSON.parse`, `JSON.stringify`, CRUD, `findIndex`, `filter`, `Date.now()`.

**Datos iniciales (seed):**

```javascript
const initialProducts = [
    { id: 1, name: "Carpa 2 Personas", category: "Alquiler", price: 15000, stock: 5, offer: false, description: "Carpas impermeables para clima frío." },
    { id: 2, name: "Chaquetón Montaña", category: "Reacondicionado", price: 45000, stock: 2, offer: true, description: "Prenda térmica reacondicionada." },
    { id: 3, name: "Hamaca Reciclada", category: "Accesorios", price: 12000, stock: 10, offer: false, description: "Hechas de hilo reciclado." },
    { id: 4, name: "Filtro de Agua", category: "Accesorios", price: 8000, stock: 15, offer: true, description: "Filtro portátil de alta eficiencia." },
    { id: 5, name: "Linterna Solar", category: "Accesorios", price: 5000, stock: 20, offer: false, description: "Carga solar rápida." },
];
```

---

### 1.5 Carrito de Compras

> "El carrito implementa un flujo completo: agregar productos, ajustar cantidades, aplicar cupones de descuento, seleccionar método de pago y confirmar la compra."

**Código clave — Agregar al carrito:**

```javascript
// frontend/src/services/dataService.js
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
```

**Código clave — Contador en Navbar:**

```jsx
// frontend/src/components/Navbar.jsx
const [cartCount, setCartCount] = useState(0);

useEffect(() => {
    const updateAll = () => {
        const cart = JSON.parse(localStorage.getItem('nomadico_cart') || '[]');
        const total = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(total);
    };
    updateAll();
    window.addEventListener('storage', updateAll);
    const interval = setInterval(updateAll, 500);
    return () => {
        window.removeEventListener('storage', updateAll);
        clearInterval(interval);
    };
}, []);
```

**Palabras clave:** `reduce`, `addEventListener('storage')`, `setInterval`, `Badge`.

**Funcionalidades del carrito:**
- Cupón `OUTDOOR` → 10% de descuento.
- Descuento por método de pago: Tarjeta de crédito → 5% adicional.
- Métodos: Mercado Pago, Cuenta RUT, Tarjeta de Crédito.

---

### 1.6 Panel Administrativo con Autenticación

> "El panel admin incluye un sistema de **autenticación con roles**. Los usuarios `admin` tienen acceso completo al CRUD de productos, mientras que los `user` ven su área personal."

**Código clave — Login con roles:**

```jsx
// frontend/src/components/AdminPanel.jsx
const handleLogin = (e) => {
    e.preventDefault();
    let userData = null;

    if (user.username === 'admin' && user.password === '123') {
        userData = { name: 'Administrador', role: 'admin' };
    } else if (user.username === 'sebastian' && user.password === '123') {
        userData = { name: 'Sebastian', role: 'user' };
    }

    if (userData) {
        localStorage.setItem('nomadico_user', JSON.stringify(userData));
        setIsLoggedIn(true);
        if (userData.role === 'admin') loadProducts();
    }
};
```

**Credenciales de prueba:**
- Admin: `admin` / `123`
- Usuario: `sebastian` / `123`

**Palabras clave:** `localStorage` para sesión, roles (`admin`/`user`), renderizado condicional.

---

### 1.7 Diseño Responsivo con Bootstrap

> "Para asegurar que la tienda sea accesible desde cualquier dispositivo, integré **Bootstrap 5** con una capa de CSS personalizada. Utilicé el sistema de **Grid** (Container, Row, Col) y componentes como Card, Table, Form, Button."

**Código clave — Grid responsivo:**

```jsx
// frontend/src/components/ProductList.jsx
<Row>
  {products.map(product => (
    <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow-sm product-card">
        {/* ... */}
      </Card>
    </Col>
  ))}
</Row>
```

**Paleta de colores personalizada (`index.css`):**

```css
:root {
  --verde-pino: #1E3A2B;
  --ocre-arcilla: #C87D55;
  --sol-dorado: #E9C46A;
  --ceniza-oscuro: #333333;
  --blanco-crema: #FFF8E1;
}
```

**Palabras clave:** `Container`, `Row`, `Col`, `sm/md/lg`, `Card`, CSS custom properties, `object-fit: cover`.

---

### 1.8 Chatbot Integrado

> "Como valor agregado, implementé un **chatbot** que funciona como guía de la tienda. Responde preguntas sobre productos y redirige al catálogo con links dinámicos."

**Código clave — Respuestas del bot:**

```jsx
// frontend/src/components/Chatbot.jsx
const generateResponse = (text) => {
    const input = text.toLowerCase();
    const productLinks = {
      carpa: { name: "Carpa 2 Personas", id: 1 },
      chaqueta: { name: "Chaquetón Montaña", id: 2 },
      hamaca: { name: "Hamaca Reciclada", id: 3 },
      filtro: { name: "Filtro de Agua", id: 4 },
      linterna: { name: "Linterna Solar", id: 5 },
    };

    for (const key in productLinks) {
      if (input.includes(key)) {
        const p = productLinks[key];
        return {
          text: `¡Sí! Tenemos el ${p.name}.`,
          link: `/producto/${p.id}`,
          linkText: "Ver producto aquí 🌲"
        };
      }
    }
    return { text: "¿Buscas carpas, chaquetas o linternas?", isBot: true };
};
```

**Palabras clave:** `useRef` (scroll automático), `setTimeout` (simular delay), `Link` de react-router-dom.

---

### 1.9 Conclusión

> "En resumen, el proyecto pasó de ser una **maqueta visual en HTML plano** a un **sistema funcional** con:
> - **Lógica de datos** con CRUD y persistencia en LocalStorage.
> - **Diseño profesional** responsivo con Bootstrap 5 y CSS personalizado.
> - **Autenticación con roles** para el panel administrativo.
> - **Carrito de compras** completo con cupones y métodos de pago.
> - **Chatbot integrado** como asistente virtual.
>
> Todo esto cumple con los estándares de desarrollo frontend moderno que se trabajaron en la asignatura."

---

## 2. DEMO EN VIVO — PASOS A SEGUIR

### Preparación
1. **Abrir terminal** en la carpeta `frontend/`.
2. Ejecutar: `npm run dev`
3. Abrir el navegador en `http://localhost:5173`

### Secuencia de la demo (5-7 minutos):

| Paso | Acción | Qué se demuestra |
|---|---|---|
| 1 | Navegar al inicio | Home con info del negocio y video |
| 2 | Ir a `/productos` | Catálogo dinámico cargado desde LocalStorage |
| 3 | Click en un producto | Navegación a `/producto/:id` con carrusel |
| 4 | "Agregar al carrito" | Notificación + badge en navbar actualizado |
| 5 | Ir a `/carrito` | Carrito con productos, cantidades, resumen |
| 6 | Aplicar cupón `OUTDOOR` | Descuento 10% aplicado |
| 7 | Seleccionar método de pago | Tarjeta de crédito con -5% adicional |
| 8 | Confirmar compra | Pantalla de éxito |
| 9 | Ir a `/admin` → Login como admin | Autenticación con roles |
| 10 | CRUD: Crear/Editar/Eliminar producto | Panel admin funcional |
| 11 | Abrir chatbot (🌲 esquina inferior) | Chatbot con respuestas y links |
| 12 | Cerrar sesión | Logout y navbar actualizado |

---

## 3. PREGUNTAS DEL PROFESOR — RESPUESTAS Y VALIDADORES

### ❓ ¿Qué es una SPA y por qué usaste React?

**Respuesta:**
> "Una **SPA (Single Page Application)** es una aplicación web que carga una sola vez y luego actualiza el contenido dinámicamente sin recargar la página. Usé React porque:
> - Permite crear **componentes reutilizables** (Navbar, ProductCard, etc.).
> - El **DOM virtual** de React hace que las actualizaciones sean eficientes.
> - **React Router** maneja la navegación sin recargas.
> - Es más **escalable** que HTML plano: si cambio una tarjeta de producto, se actualiza en todas las vistas."

**Validador — Código:** `App.jsx` → `<Router>`, `<Routes>`, `<Route>`.

---

### ❓ Explícame el patrón CRUD que implementaste

**Respuesta:**
> "CRUD son las 4 operaciones fundamentales de cualquier sistema de datos:
> - **Create:** `ProductService.create()` — Agrega un producto nuevo con un ID generado por `Date.now()`.
> - **Read:** `ProductService.getAll()` — Recupera todos los productos de LocalStorage.
> - **Update:** `ProductService.update(id, data)` — Encuentra el producto por ID y lo actualiza con spread operator.
> - **Delete:** `ProductService.delete(id)` — Filtra el array excluyendo el ID a eliminar.
>
> Todo se persiste en `localStorage` usando `JSON.stringify` para guardar y `JSON.parse` para leer."

**Validador — Código:** `services/dataService.js` → líneas 44-84.

---

### ❓ ¿Cómo funciona la persistencia de datos?

**Respuesta:**
> "Usé **localStorage** del navegador como base de datos simulada. Los datos se guardan como strings JSON:
> - `nomadico_products`: Catálogo de productos.
> - `nomadico_cart`: Carrito de compras.
> - `nomadico_user`: Sesión del usuario activo.
>
> Al cargar la página, `ProductService.getAll()` verifica si hay datos en localStorage. Si no hay, carga los `initialProducts` (seed data). Esto significa que si recargo la página, los productos creados o eliminados desde el admin **persisten**."

**Validador — Código:** `dataService.js` → `loadFromLocalStorage()`, `saveToLocalStorage()`.

**Demo:** Crear un producto en admin → recargar página → el producto sigue ahí.

---

### ❓ ¿Cómo manejas el estado en React?

**Respuesta:**
> "Usé dos hooks principales:
> - **`useState`**: Para estado local de cada componente. Por ejemplo, en `ProductList` uso `useState([])` para la lista de productos y `useState(true)` para el loading.
> - **`useEffect`**: Para efectos secundarios. Por ejemplo, cargar los productos al montar el componente o escuchar cambios en localStorage.
>
> En el `Navbar`, uso `useEffect` con `setInterval` y `addEventListener('storage')` para mantener sincronizado el contador del carrito en tiempo real."

**Validador — Código:**
- `ProductList.jsx` → `useState`, `useEffect` (líneas 7-25).
- `Navbar.jsx` → `useEffect` con `setInterval` (líneas 10-30).

---

### ❓ ¿Qué es el `useEffect` y para qué lo usas?

**Respuesta:**
> "`useEffect` es un hook de React que se ejecuta después de que el componente se renderiza. Lo uso para:
> 1. **Cargar datos al montar:** En `ProductList`, llamo a `ProductService.getAll()` dentro de un `useEffect` con dependencia vacía `[]` para que se ejecute solo una vez.
> 2. **Escuchar eventos:** En `Navbar`, escucho el evento `storage` para detectar cambios en el carrito desde otras pestañas.
> 3. **Cleanup:** Retorno una función de limpieza que remueve los event listeners y clearInterval para evitar memory leaks."

**Validador — Código:** `Navbar.jsx` → `useEffect` con `return () => { ... }` (líneas 10-30).

---

### ❓ ¿Cómo funciona la navegación entre páginas?

**Respuesta:**
> "Usé **React Router DOM** para la navegación. En `App.jsx` definí las rutas:
> - `/` → Home
> - `/productos` → ProductList
> - `/producto/:id` → ProductDetail (ruta dinámica con parámetro)
> - `/carrito` → Cart
> - `/admin` → AdminPanel
>
> Para navegar, uso `<Link to="...">` en lugar de `<a href>` para evitar recargas. En `ProductDetail`, uso `useParams()` para obtener el ID del producto desde la URL."

**Validador — Código:**
- `App.jsx` → `<Routes>` con `<Route>` (líneas 16-22).
- `ProductDetail.jsx` → `const { id } = useParams()` (línea 7).

---

### ❓ ¿Cómo implementaste el sistema de roles?

**Respuesta:**
> "El sistema de roles funciona así:
> 1. Al hacer login, se validan las credenciales contra usuarios hardcodeados.
> 2. Si son correctas, se guarda un objeto `{ name, role }` en `localStorage` con la key `nomadico_user`.
> 3. El `Navbar` lee este objeto y muestra contenido diferente según el rol:
>    - Si es `admin`: muestra enlace a "Admin 🛠️".
>    - Si es `user`: muestra solo el saludo.
> 4. En `AdminPanel`, si el rol es `admin`, se muestra el CRUD completo. Si es `user`, se muestra el área personal."

**Validador — Código:**
- `AdminPanel.jsx` → `handleLogin()` (líneas 28-48).
- `Navbar.jsx` → renderizado condicional con `currentUser.role === 'admin'` (líneas 71-73).

---

### ❓ ¿Cómo funciona el carrito de compras?

**Respuesta:**
> "El carrito funciona con estas partes:
> 1. **`addToCart()`** en `dataService.js`: Verifica si el producto ya está en el carrito. Si sí, incrementa la cantidad. Si no, lo agrega con cantidad 1.
> 2. **Contador en Navbar:** Usa `reduce()` para sumar todas las cantidades y `setInterval` para actualizar cada 500ms.
> 3. **Vista del carrito (`Cart.jsx`):** Muestra tabla con productos, botones +/- para cantidad, opción de eliminar, cupón de descuento y métodos de pago.
> 4. **Cupón:** El cupón `OUTDOOR` da 10% de descuento. Tarjeta de crédito da 5% adicional.
> 5. **Checkout:** Al confirmar, muestra pantalla de éxito y limpia el carrito."

**Validador — Código:**
- `dataService.js` → `addToCart()` (líneas 29-41).
- `Cart.jsx` → `updateQuantity()`, `removeItem()`, `applyCoupon()` (líneas 17-38).

---

### ❓ ¿Qué componentes de Bootstrap usaste?

**Respuesta:**
> "Usé varios componentes de **react-bootstrap**:
> - **Layout:** `Container`, `Row`, `Col` (sistema de grid).
> - **Cards:** `Card`, `Card.Body`, `Card.Title`, `Card.Text`, `Card.Img`.
> - **Navegación:** `Navbar`, `Nav`, `Navbar.Brand`, `Navbar.Toggle`, `Navbar.Collapse`.
> - **Formularios:** `Form`, `Form.Group`, `Form.Control`, `Form.Label`, `Form.Select`.
> - **Botones:** `Button` con variantes (`outdoor`, `outline-warning`, `outline-danger`).
> - **Tablas:** `Table` responsive.
> - **Otros:** `Badge`, `Carousel`, `Button`.
>
> Además, usé clases de utilidad como `d-flex`, `justify-content-between`, `text-center`, `shadow-sm`, `mb-4`."

**Validador — Código:** `ProductList.jsx` → imports de `react-bootstrap` (línea 2).

---

### ❓ ¿Cómo personalizaste los estilos?

**Respuesta:**
> "Definí **variables CSS custom properties** en `:root` con la paleta del proyecto:
> - `--verde-pino: #1E3A2B`
> - `--ocre-arcilla: #C87D55`
> - `--sol-dorado: #E9C46A`
> - `--blanco-crema: #FFF8E1`
>
> Luego creé clases personalizadas como `.product-card` (fondo semitransparente verde pino), `.btn-outdoor` (botones con ocre y dorado), `.catalog-title` (títulos con sombra) y `.chatbot-container` (posicionamiento fijo del chatbot). El fondo de la página usa `background-image` con `background-attachment: fixed` para un efecto parallax."

**Validador — Código:** `index.css` → `:root` variables (líneas 1-7), `.product-card` (líneas 34-46).

---

### ❓ ¿Qué es JSX?

**Respuesta:**
> "**JSX** es una extensión de sintaxis de JavaScript que permite escribir HTML dentro de archivos JavaScript. Es lo que hace posible escribir componentes como:
>
> ```jsx
> <Card className="product-card">
>   <Card.Title>{product.name}</Card.Title>
> </Card>
> ```
>
> Bajo el capó, JSX se compila a llamadas a `React.createElement()`. Permite mezclar lógica JavaScript con markup HTML, usando `{}` para expresiones JS dentro del JSX."

**Validador — Código:** Cualquier componente `.jsx` del proyecto.

---

### ❓ ¿Cómo manejas las imágenes de los productos?

**Respuesta:**
> "Las imágenes están mapeadas por nombre de producto en una función `getProductImages()`. Cada producto tiene un array de imágenes almacenadas en `public/img/`. Por ejemplo:
>
> ```javascript
> const getProductImages = (productName) => {
>   const mapping = {
>     "Carpa 2 Personas": ["/img/carpa2personas/carpa2personas.jpg", "/img/carpa2personas/carpa2personas1.jpg"],
>     "Chaquetón Montaña": ["/img/chaqueta/chaqueton_montaña1.jpg", ...],
>   };
>   return mapping[productName] || ['https://via.placeholder.com/300x200'];
> };
> ```
>
> En `ProductDetail` uso un `Carousel` de Bootstrap para mostrar las imágenes. En `ProductList` implementé un efecto hover que cambia la imagen al mover el mouse."

**Validador — Código:** `ProductList.jsx` → `getProductImages()` (líneas 27-36), `ProductDetail.jsx` → `<Carousel>` (líneas 80-94).

---

### ❓ ¿Qué harías para conectar esto a un backend real?

**Respuesta:**
> "Para conectar a un backend real, reemplazaría el `dataService.js`:
> 1. En lugar de `localStorage`, usaría `fetch()` o `axios` para hacer peticiones HTTP a una API REST.
> 2. `ProductService.getAll()` sería un `fetch('/api/products')`.
> 3. `ProductService.create()` sería un `fetch('/api/products', { method: 'POST', body: JSON.stringify(product) })`.
> 4. El carrito y la sesión se manejarían con un backend (base de datos + autenticación con JWT).
> 5. Los `initialProducts` se reemplazarían por datos de la base de datos."

---

### ❓ ¿Por qué usaste Vite?

**Respuesta:**
> "**Vite** es un build tool moderno que ofrece:
> - **Hot Module Replacement (HMR):** Los cambios se reflejan instantáneamente sin recargar.
> - **Build rápido:** Usa esbuild para bundling, mucho más rápido que Webpack.
> - **Configuración mínima:** Funciona casi sin configuración.
> - **Soporte nativo para JSX y módulos ES.**
>
> Lo comparé con Create React App (CRA) y Vite es significativamente más rápido y ligero."

**Validador — Código:** `package.json` → `"@vitejs/plugin-react"`, `"vite"`.

---

### ❓ ¿Cómo funciona el chatbot?

**Respuesta:**
> "El chatbot funciona con un sistema de **palabras clave**:
> 1. El usuario escribe un mensaje.
> 2. `generateResponse()` convierte el texto a minúsculas y busca palabras clave (`carpa`, `chaqueta`, `hamaca`, `filtro`, `linterna`).
> 3. Si encuentra una coincidencia, devuelve una respuesta con un `Link` de React Router al producto correspondiente.
> 4. Usa `useRef` para hacer scroll automático al último mensaje.
> 5. Usa `setTimeout` para simular un delay de respuesta de 800ms."

**Validador — Código:** `Chatbot.jsx` → `generateResponse()` (líneas 32-68).

---

## 4. PRUEBAS JASMINE/KARMA — GUÍA

### ⚠️ Estado actual

**Las pruebas Jasmine/Karma NO están implementadas aún.** El `package.json` no incluye estas dependencias. Sin embargo, aquí está lo que se espera y cómo explicarlo:

### ¿Qué se espera?

La pauta exige **pruebas unitarias** para validar la lógica de negocio. Se deben cubrir al menos estos casos:

| Tipo de prueba | Qué validar | Componente/Servicio |
|---|---|---|
| CRUD — Read | `ProductService.getAll()` retorna array de productos | `dataService.js` |
| CRUD — Create | `ProductService.create()` agrega producto y retorna nuevo objeto | `dataService.js` |
| CRUD — Update | `ProductService.update()` modifica producto existente | `dataService.js` |
| CRUD — Delete | `ProductService.delete()` elimina producto por ID | `dataService.js` |
| Carrito — Add | `addToCart()` agrega producto al carrito | `dataService.js` |
| Carrito — Duplicate | `addToCart()` incrementa cantidad si ya existe | `dataService.js` |
| Navbar — Cart count | El badge muestra la cantidad correcta | `Navbar.jsx` |
| Admin — Login | Login exitoso con credenciales válidas | `AdminPanel.jsx` |
| Admin — Roles | Admin ve CRUD, user ve área personal | `AdminPanel.jsx` |
| Chatbot — Response | `generateResponse()` retorna link correcto por keyword | `Chatbot.jsx` |

### Ejemplo de prueba Jasmine para el DataService

```javascript
// Ejemplo: dataService.spec.js
describe('ProductService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial products when localStorage is empty', () => {
    const products = ProductService.getAll();
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should create a new product', () => {
    const newProduct = { name: 'Test', category: 'Test', price: 100, description: 'Test' };
    const created = ProductService.create(newProduct);
    expect(created.id).toBeDefined();
    expect(ProductService.getAll().length).toBe(1);
  });

  it('should update an existing product', () => {
    const created = ProductService.create({ name: 'Test', category: 'Test', price: 100, description: 'Test' });
    ProductService.update(created.id, { name: 'Updated' });
    const updated = ProductService.getById(created.id);
    expect(updated.name).toBe('Updated');
  });

  it('should delete a product', () => {
    const created = ProductService.create({ name: 'Test', category: 'Test', price: 100, description: 'Test' });
    ProductService.delete(created.id);
    expect(ProductService.getAll().length).toBe(0);
  });

  it('should add product to cart', () => {
    const product = { id: 1, name: 'Test', price: 100 };
    addToCart(product);
    const cart = JSON.parse(localStorage.getItem('nomadico_cart'));
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(1);
  });

  it('should increment quantity if product already in cart', () => {
    const product = { id: 1, name: 'Test', price: 100 };
    addToCart(product);
    addToCart(product);
    const cart = JSON.parse(localStorage.getItem('nomadico_cart'));
    expect(cart[0].quantity).toBe(2);
  });
});
```

### Cómo explicarlo en la presentación

> "Las pruebas unitarias con **Jasmine y Karma** validarían la lógica del `ProductService`. Jasmine es el framework de assertions (`expect().toBe()`) y Karma es el test runner que ejecuta las pruebas en el navegador.
>
> Las pruebas cubrirían:
> 1. **CRUD operations:** Verificar que cada operación modifica correctamente los datos en localStorage.
> 2. **Carrito:** Verificar que `addToCart` agrega correctamente e incrementa cantidad en duplicados.
> 3. **Componentes:** Verificar que los componentes renderizan correctamente con los datos recibidos.
>
> Cada test sigue el patrón **Arrange-Act-Assert**: preparar datos, ejecutar acción, verificar resultado."

---

## 5. CONCEPTOS CLAVE PARA REPASAR

### React
- **Componentes:** Funciones JS que retornan JSX. Son piezas reutilizables de la UI.
- **Props:** Datos que se pasan de padre a hijo. Son inmutables.
- **State:** Datos internos de un componente que pueden cambiar. Se manejan con `useState`.
- **Hooks:** Funciones que permiten usar state y lifecycle en componentes funcionales.
  - `useState`: Estado local.
  - `useEffect`: Efectos secundarios (cargar datos, suscribirse a eventos).
  - `useParams`: Obtener parámetros de la URL.
  - `useRef`: Referencia a un elemento DOM o valor persistente.
  - `useNavigate`: Navegación programática.

### React Router
- **BrowserRouter:** Envuelve la app para habilitar rutas.
- **Routes/Route:** Definen las rutas y sus componentes.
- **Link:** Navegación sin recarga (reemplaza `<a href>`).
- **useParams:** Obtiene parámetros dinámicos de la URL (`:id`).
- **useNavigate:** Navegación programática desde eventos.

### Bootstrap
- **Grid System:** Container → Row → Col (sm, md, lg, xl).
- **Componentes:** Card, Navbar, Button, Form, Table, Badge, Carousel.
- **Clases de utilidad:** `d-flex`, `justify-content-between`, `text-center`, `mb-4`, `shadow-sm`.

### LocalStorage
- **API del navegador** para persistir datos como strings.
- `localStorage.setItem(key, value)` — Guardar.
- `localStorage.getItem(key)` — Leer.
- `localStorage.removeItem(key)` — Eliminar.
- Los datos persisten al recargar y cerrar el navegador.
- Se usa `JSON.stringify()` para guardar objetos y `JSON.parse()` para leerlos.

### CRUD
- **Create:** Insertar nuevo registro.
- **Read:** Leer/consultar registros.
- **Update:** Modificar registro existente.
- **Delete:** Eliminar registro.

### SPA vs MPA
- **SPA (Single Page Application):** Una sola página HTML que se actualiza dinámicamente. Ej: React, Angular, Vue.
- **MPA (Multi Page Application):** Múltiples páginas HTML que se cargan por separado. Ej: HTML plano, PHP.

---

## 🎯 RESUMEN RÁPIDO — CHEAT SHEET

| Concepto | Archivo | Línea clave |
|---|---|---|
| Rutas de la app | `App.jsx` | `<Routes>` → `<Route>` |
| CRUD completo | `dataService.js` | `ProductService` object |
| Carrito | `dataService.js` + `Cart.jsx` | `addToCart()`, `updateQuantity()` |
| Login con roles | `AdminPanel.jsx` | `handleLogin()` |
| Navbar dinámico | `Navbar.jsx` | `useEffect` con `setInterval` |
| Chatbot | `Chatbot.jsx` | `generateResponse()` |
| Paleta de colores | `index.css` | `:root` variables |
| Grid responsivo | `ProductList.jsx` | `<Col sm={12} md={6} lg={4}>` |
| Carrusel de imágenes | `ProductDetail.jsx` | `<Carousel>` |
| Cupón de descuento | `Cart.jsx` | `applyCoupon()` |

---

**¡Buena suerte con la presentación! 🌲**
