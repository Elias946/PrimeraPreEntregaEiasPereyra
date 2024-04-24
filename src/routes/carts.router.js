import { Router } from "express";
import Cart from "../Models/cart.js";
const router = Router();

const CartInstance = new Cart();

router.get("/:id",(req, res) => {
    res.json(req.body);
})

router.post("/:id/:pid",(req, res) => {
    const addCartProduct = CartInstance.addCart(req.params.id, req.params.pid, req.body.quantity);
    res.json(addCartProduct);
})

export default router;
