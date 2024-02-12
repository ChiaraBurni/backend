const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    let products = this.getProductsFromFile();
    const codeExists = products.some(existingProduct => existingProduct.code === product.code);
    if (codeExists) {
      console.error("Ya existe un producto con el mismo código");
      return;
    }

    product.id = this.getNextProductId(products);
    products.push(product);
    this.saveProductsToFile(products);
    console.log("Producto agregado:", product);
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
  }

  getNextProductId(products) {
    const maxId = products.reduce((max, product) => product.id > max ? product.id : max, 0);
    return maxId + 1;
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    let products = this.getProductsFromFile();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      updatedProduct.id = id;
      products[index] = updatedProduct;
      this.saveProductsToFile(products);
      console.log("Producto actualizado:", updatedProduct);
    } else {
      console.error("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    let products = this.getProductsFromFile();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      this.saveProductsToFile(products);
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.error("Producto no encontrado");
    }
  }
}

module.exports = ProductManager;

// TESTING
const productManager = new ProductManager('productos.json');

const emptyProducts = productManager.getProducts();
console.log("Productos al inicio:", emptyProducts);

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
});

// getProducts
const productsAfterAdding = productManager.getProducts();
console.log("Productos despues de agregar:", productsAfterAdding);

// getProductById
const productById = productManager.getProductById(1);
console.log("Producto por ID:", productById);

// updateProduct
productManager.updateProduct(1, { title: "testing" });

// deleteProduct
productManager.deleteProduct(1);

