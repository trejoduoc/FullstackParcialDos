function addToCart(productName) {
    alert(`¡Producto ${productName} agregado al carrito!`);
}
// 1. Arreglo de productos
const listaProductos = [
  {
    id: 1,
    nombre: "Set Pro 1",
    precio: 40000,
    imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.IXZbyBm3Lb9G1GIMu1xWwwHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=eed79c70fe433d5850f578149ec37a4824160ca0bbcbc14fccc461998fa4d7bb&ipo=images"
  },
  {
    id: 2,
    nombre: "Set Pro 2",
    precio: 30000,
    imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.VgoS8ulR-8ALNZrAH5_fbQHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=f27d57ff67c05986ce73d29a1bece50ffa3be9b2e8be0ff51917dfc740589ca0&ipo=images"
  },
  {
    id: 3,
    nombre: "Set Pro 3",
    precio: 20000,
    imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.C4q7cpdxFsuqZd1i9z2ZcAHaHa%3Fr%3D0%26pid%3DApi&f=1&ipt=30e291078048f5be1a0fb66781bb187ccaea78bcb8fa7d1459ab25cdc0270fa0&ipo=images"
  }
];

// 2. Función para mostrar los productos en HTML
function cargarProductos() {
  const contenedor = document.getElementById("contenedor-productos");

  // Limpiar el contenido anterior
  contenedor.innerHTML = "";

  // Recorrer la lista de productos
  listaProductos.forEach((producto) => {
    const tarjeta = document.createElement("div");

    tarjeta.classList.add("tarjeta-producto");

    tarjeta.innerHTML = `
      <img 
        src="${producto.imagen}" 
        alt="${producto.nombre}"
      >

      <h3>${producto.nombre}</h3>

      <p>$${producto.precio}</p>

      <button onclick="agregarAlCarrito(${producto.id})">
        Añadir al carrito
      </button>
    `;

    contenedor.appendChild(tarjeta);
  });
}

// 3. Función para añadir productos al carrito
function agregarAlCarrito(idProducto) {
  const productoSeleccionado = listaProductos.find(
    (producto) => producto.id === idProducto
  );

  if (productoSeleccionado) {
    console.log("Producto añadido al carrito:", productoSeleccionado);
    alert(`${productoSeleccionado.nombre} fue añadido al carrito`);
  }
}

// 4. Cargar los productos cuando se abra la página
document.addEventListener("DOMContentLoaded", cargarProductos);





document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('formulario-contacto');

    if (formulario) {
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const motivo = document.getElementById('motivo').value.trim();

            if (nombre === '' || email === '' || motivo === '') {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regexEmail.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado con éxito. Te contactaremos pronto al correo: ${email}`);

            formulario.reset();
        });
    }

});