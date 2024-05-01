import products from "../Models/Product.js";
import {
  appendFileSync,
  existsSync,
  readFileSync,
  writeFile,
  writeFileSync,
} from "fs";
class Cart {
  constructor() {
    try {
      this.product = new products();
      this.products = [];
      this.cart = JSON.parse(readFileSync("./src/data/cart.json", "utf-8"));
    } catch (error) {
      writeFileSync("./src/data/cart.json", "[]", "utf-8");
      this.cart = [];
    }
  }

  addCart(id, pid, quantity) {
    if (!this.isValid(pid, quantity)) {
      return { error: "product is not valid in cart" };
    }

    try {
      if (!this.existCart(id)) {
        this.cart.push({ id, products: [{ pid, quantity }] });
        writeFileSync("./src/data/cart.json", JSON.stringify(this.cart), "utf-8");
        return { message: "This Cart is added successfully", cart: this.cart };
      } else {
        this.cart = this.cart.map((cart) =>
          cart.id === id
            ? {
                ...cart,
                products: cart.products.some((p) => p.pid === pid)
                  ? cart.products.map((product) =>
                      product.pid === pid
                        ? { ...product, quantity: (product.quantity = quantity) }
                        : product
                    )
                  : [...cart.products, { pid, quantity }],
              }
            : cart
        );
        writeFileSync("./src/data/cart.json", JSON.stringify(this.cart), "utf-8");
        return { message: "This Cart is updated successfully", cart: this.cart };
      }
    } catch (error) {
      return { error: error };
    }
  }
  getCartById(id) {
    return this.cart.find((cart) => cart.id === id);
  }
  deleteProductInCart(id, pid) {
    try {
      this.cart = this.cart.map((cart) =>
        cart.id === id
          ? {
              ...cart,
              products: cart.products.filter((product) => product.pid !== pid),
            }
          : cart
      );
      writeFileSync("./src/data/cart.json", JSON.stringify(this.cart), "utf-8");
      return { message: "Product deleted successfully", cart: this.cart };
    } catch (error) {
      return { error: error };
    }
  }
  existCart(id) {
    return this.cart.some((cart) => cart.id === id);
  }
  isValid(pid, quantity) {
    return this.productExist(pid) && quantity > 0;
  }

  productExist(pid) {
    if (!Array.isArray(this.product.getProducts())) {
      return false;
    }
    return this.product.getProducts().some((product) => product.id === pid);
  }
}
export default Cart;
