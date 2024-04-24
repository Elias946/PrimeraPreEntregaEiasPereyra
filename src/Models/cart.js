import products from '../Models/Product.js';
import {appendFileSync, existsSync, readFileSync, writeFileSync} from 'fs'
class Cart {
    constructor() {
        try {
            this.product = new products();
            this.products = [];
            this.cart = JSON.parse(readFileSync('./src/data/cart.json', 'utf-8'))
        } catch (error) {
            writeFileSync('./src/data/cart.json', '[]', 'utf-8');
            this.cart = [];
        }

    }

    addCart(id,pid,quantity){
       
        if(!this.isValid(pid,quantity)){
            return {'error': 'product is not valid in cart'}
        }
        
        try {
            if(this.existCart(id)){
               this.cart.product = this.cart.product.map((product) => {
                   if(product.pid === parseInt(pid)){
                       product.quantity += parseInt(quantity)
                   }
               })
               writeFileSync('./src/data/cart.json', JSON.stringify(this.cart), 'utf-8')
                return {'message': 'Product added to Cart', 'cart': this.cart}
            }

            this.cart.push({"id":parseInt(id), "products":{"pid":pid, "quantity":quantity}});
            writeFileSync('./src/data/cart.json', JSON.stringify(this.cart), 'utf-8')
        return {'message': 'Product added to Cart', 'cart': this.cart}
        } catch (error) {
        return { 'error' : error }
        }

    }
    getCartById(id){
        return this.cart.some(cart => cart.id === parseInt(id))
    }
    existCart (id){
        return this.cart.some(cart => cart.id === parseInt(id))
    }
    isValid(pid,quantity){
        return (this.productExist(pid) && 
        quantity > 0)
    }
    productExist(pid){
        return this.product.getProducts().some((p) => p.id === parseInt(pid))
    }
}
export default Cart