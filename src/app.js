const express = require('express');
const ProductManager = require('./productManager');

const PORT = 3000;
const app = express();
const productManager = new ProductManager('./src/productos.json');

app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts(); 
        let limit = parseInt(req.query.limit);
        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.send(limitedProducts);
            return;
        }
        res.send(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error al obtener productos");
    }
});
  
app.get("/products/:pid", async (req, res) => {
    try {
        let pid = req.params.pid;
        const product = await productManager.getProductById(pid); 
        if (!product) {
            const error = {error: `Product Id: ${pid} not found`};
            res.status(404).send(error);
            return;
        }
        res.send(product);
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).send("Error al obtener producto por ID");
    }
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
