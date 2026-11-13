import { ProductService } from './dataService';

describe('ProductService', () => {
  let mockStorage = {};

  beforeEach(() => {
    mockStorage = {};
    window.localStorage = {
      getItem: (k) => (k in mockStorage ? mockStorage[k] : null),
      setItem: (k, v) => { mockStorage[k] = String(v); },
      removeItem: (k) => { delete mockStorage[k]; },
    };
  });

  afterEach(() => {
    delete window.localStorage;
  });

  it('getAll devuelve los 5 productos iniciales', () => {
    const products = ProductService.getAll();
    expect(products.length).toBe(5);
  });

  it('getById encuentra un producto con número o texto', () => {
    expect(ProductService.getById(1).name).toBe('Carpa 2 Personas');
    expect(ProductService.getById('2').name).toBe('Chaquetón Montaña');
  });

  it('getById devuelve undefined si no existe', () => {
    expect(ProductService.getById(999)).toBeUndefined();
  });

  it('create agrega un producto con id y lo guarda', () => {
    const nuevo = ProductService.create({ name: 'Mochila', price: 20000, stock: 3 });
    expect(nuevo.id).toBeDefined();
    expect(ProductService.getAll().length).toBe(6);
    expect(ProductService.getById(nuevo.id).name).toBe('Mochila');
  });

  it('update modifica los datos de un producto', () => {
    ProductService.update(1, { price: 18000 });
    expect(ProductService.getById(1).price).toBe(18000);
  });

  it('update lanza error si el producto no existe', () => {
    expect(() => ProductService.update(999, { price: 1 }))
      .toThrowError('Producto no encontrado');
  });

  it('delete elimina el producto', () => {
    const res = ProductService.delete(1);
    expect(res.success).toBe(true);
    expect(ProductService.getById(1)).toBeUndefined();
    expect(ProductService.getAll().length).toBe(4);
  });
});