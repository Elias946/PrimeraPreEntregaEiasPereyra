import { Router } from "express";
import Cart from "../Models/cart.js";
const router = Router();

const CartInstance = new Cart();

router.get("/:id",(req, res) => {
    const cart = CartInstance.getCartById(parseInt(req.params.id));
    res.json(cart);
})

router.post("/:id/:pid",(req, res) => {
    const addCartProduct = CartInstance.addCart(parseInt(req.params.id), parseInt(req.params.pid), parseInt(req.body.quantity));
    res.json(addCartProduct);
})

router.delete("/:id/:pid", (req, res) => {

    const deletedProduct = CartInstance.deleteProductInCart(parseInt(req.params.id), parseInt(req.params.pid));
    res.json(deletedProduct)
})

export default router;
