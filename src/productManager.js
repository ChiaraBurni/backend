const fsPromises = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = []
  }

  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    let products = await this.getProductsFromFile();
    const codeExists = products.some(existingProduct => existingProduct.code === product.code);
    if (codeExists) {
      console.error("Ya existe un producto con el mismo código");
      return;
    }

    product.id = this.getNextProductId(products);
    products.push(product);
    await this.saveProductsToFile(products);
    console.log("Producto agregado:", product);
  }

  async getProductsFromFile() {
    try {
      const data = await fsPromises.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  }

  async saveProductsToFile(products) {
    try {
      await fsPromises.writeFile(this.filePath, JSON.stringify(products, null, 2));
      console.log("Archivo guardado correctamente");
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
  }

  getNextProductId(products) {
    const maxId = products.reduce((max, product) => product.id > max ? product.id : max, 0);
    return maxId + 1;
  }

  async getProducts() {
    return await this.getProductsFromFile();
  }

  async getProductById(id) {
    const productId = parseInt(id);
    const products = await this.getProductsFromFile();
    const product = products.find(product => product.id === productId);
    return product;
}


  async updateProduct(id, updatedProduct) {
    let products = await this.getProductsFromFile();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      updatedProduct.id = id;
      products[index] = updatedProduct;
      await this.saveProductsToFile(products);
      console.log("Producto actualizado:", updatedProduct);
    } else {
      console.error("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    let products = await this.getProductsFromFile();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      await this.saveProductsToFile(products);
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.error("Producto no encontrado");
    }
  }
}

module.exports = ProductManager;




