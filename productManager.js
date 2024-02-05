class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }
  
      
      const codeExists = this.products.some(product => product.code === code);
      if (codeExists) {
        console.error("Ya existe un producto con el mismo código");
        return;
      }
  
      const product = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(product);
      console.log("Producto agregado:", product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado");
      }
    }
  }
  
  // PROCESO DE TESTING

  const productManager = new ProductManager();
  
  const emptyProducts = productManager.getProducts();
  console.log("Productos al inicio:", emptyProducts);
  
  productManager.addProduct("Producto Prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);
  

  const productsAfterAdding = productManager.getProducts();
  console.log("Productos después de agregar:", productsAfterAdding);
  
  // REPETICION DE PRODUCTO
  productManager.addProduct("Producto Prueba", "Este es un producto prueba", 200, "Sin Imagen", "abc123", 25);
  
  const productById = productManager.getProductById(1);
  console.log("Producto por ID:", productById);
  
  const nonExistingProduct = productManager.getProductById(999);
  
  
  