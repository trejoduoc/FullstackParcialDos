/**
 * DATA SERVICE - NOMADICO OUTDOOR
 * Este archivo actúa como una base de datos simulada para la aplicación.
 * Implementa operaciones CRUD básicas sobre los productos.
 */

const initialProducts = [
    { id: 1, name: "Carpa 2 Personas", category: "Alquiler", price: 15000, stock: 5, offer: false, description: "Carpas impermeables para clima frío." },
    { id: 2, name: "Chaquetón Montaña", category: "Reacondicionado", price: 45000, stock: 2, offer: true, description: "Prenda térmica reacondicionada." },
    { id: 3, name: "Hamaca Reciclada", category: "Accesorios", price: 12000, stock: 10, offer: false, description: "Hechas de hilo reciclado." },
    { id: 4, name: "Filtro de Agua", category: "Accesorios", price: 8000, stock: 15, offer: true, description: "Filtro portátil de alta eficiencia." },
    { id: 5, name: "Linterna Solar", category: "Accesorios", price: 5000, stock: 20, offer: false, description: "Carga solar rápida." },
];

// Simulamos el almacenamiento en LocalStorage para que los datos no se borren al recargar
const STORAGE_KEY = 'nomadico_products';

const saveToLocalStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadFromLocalStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialProducts;
};

// OPERACIONES CRUD
export const ProductService = {
    // READ: Obtener todos los productos
    getAll: () => {
        return loadFromLocalStorage();
    },

    // READ: Obtener un solo producto por ID
    getById: (id) => {
        const products = loadFromLocalStorage();
        return products.find(p => p.id === parseInt(id));
    },

    // CREATE: Agregar un nuevo producto
    create: (product) => {
        const products = loadFromLocalStorage();
        const newProduct = { ...product, id: Date.now() }; // Generamos ID único basado en tiempo
        products.push(newProduct);
        saveToLocalStorage(products);
        return newProduct;
    },

    // UPDATE: Actualizar un producto existente
    update: (id, updatedData) => {
        const products = loadFromLocalStorage();
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedData };
            saveToLocalStorage(products);
            return products[index];
        }
        throw new Error("Producto no encontrado");
    },

    // DELETE: Eliminar un producto
    delete: (id) => {
        let products = loadFromLocalStorage();
        const filtered = products.filter(p => p.id !== parseInt(id));
        saveToLocalStorage(filtered);
        return { success: true };
    }
};
