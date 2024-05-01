import { Router } from "express";
import Product from '../Models/Product.js';
const router = Router();

const productInstance = new Product();

router.get("/", (req, res) => {
    const products = productInstance.getProducts(req.query.limit);
    res.json(products);
});


router.get("/:id", (req, res) => {
    const product = productInstance.getProductsById(req.params.id);
    res.json(product);
})

router.post("/", (req, res) => {
    const product = req.body;
    const addedProduct = productInstance.addProduct(product);
    res.json(addedProduct);
})

router.put("/:id", (req, res) => {
    
    const product = req.body;
    const updatedProduct = productInstance.updateProduct(req.params.id, product);
    res.json(updatedProduct);
})

router.delete("/:id", (req, res) => {
    productInstance.deleteProduct(req.params.id);
    res.json({'message': 'Product deleted successfully'});
})
export default router;
