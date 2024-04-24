
import {appendFileSync, existsSync, readFileSync, writeFileSync} from 'fs'
class Product {
    constructor() {
        try {
            this.products = JSON.parse(readFileSync('./src/data/products.json', 'utf-8'))
        } catch (error) {
            writeFileSync('./src/data/products.json', '[]', 'utf-8');
            this.products = [];
        }
        this.nextId = this.products.length + 1 ;
    }
    
    addProduct(product){
        if (!this.isValid(product)) {
           
            return {'error': 'Invalid product'}
        }
        
        if(this.isDuplicate(product)){
            return {'error': 'Product already exists'}
        }

        try {
            product.id = this.nextId++
            this.products.push(product)
            writeFileSync('./src/data/products.json', JSON.stringify(this.products), 'utf-8')
            return {'message': 'Product added successfully', 'product': product}
        } catch (error) {
            return { 'error' : error }
        }
    
    }

    getProducts(){
        if(this.products.length === 0){
            return { 'error': 'database is empty' }
        }
        return this.products
    }

    getProductsById(id){

        const product = this.products.find(product => product.id === parseInt(id))

        if(!product){
            return {'error': 'Product not found'}
        }

        return product
    }
    updateProduct(id, product){

        if(!this.isValid(product)){
            return {'error': 'Invalid product'}
        }

        if(this.products.length === 0){
            return { 'error': 'database is empty' }
        }

        if(!this.products.some((p) => p.id === parseInt(id))){
            return {'error': 'Product not found'}
        }

        
        try {

            this.products = this.products.map((p) => p.id === parseInt(id) ? {...p, ...product} : p)
            writeFileSync('./src/data/products.json', JSON.stringify(this.products), 'utf-8')
           
            return {'message': 'Product edited successfully', 'product': product};

        } catch (error) {
            return { 'error' : error }
        }
    }

    deleteProduct(id){
        if(this.products.length === 0){
            return { 'error': 'database is empty' }
        }

        try {
            this.products = this.products.filter(product => product.id !== parseInt(id))
            writeFileSync('./src/data/products.json', JSON.stringify(this.products), 'utf-8')
        } catch (error) {
            return { 'error' : error }
        }
    }


    isValid(product){
        return (
            product.title &&
            product.description &&
            product.price &&
            product.code &&
            product.thumbnail &&
            product.stock
        )
    }

    isDuplicate(product){
       
      
           return this.products.some((p) => p.code === product.code)

    }
}

export default Product;
