import express from 'express'
import cookieParser from 'cookie-parser'
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/carts.router.js";
const app = express()
const port = 8080

app.use(cookieParser())
app.use('/public',express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})