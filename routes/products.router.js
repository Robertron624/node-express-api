import express from 'express';
import ProductService from '../services/product.service.js';

const productsRouter = express.Router();

const productService = new ProductService()


productsRouter.get('/', async (req, res) => {

  let products = await productService.find()

  res.json(products);
});

productsRouter.get('/filter', (req, res) => {
  res.send("soy un filter");
});

productsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    let product = await productService.findOne(id);

    res.json(product);
  } catch (error) {
      next(error);
  }

});

productsRouter.post('/', async (req, res) => {

  const body = req.body;

  let newlyCreatedProduct = await productService.create(body);

  if(newlyCreatedProduct){
    res.status(201).json(newlyCreatedProduct);
  }
})

productsRouter.patch('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const {id} = req.params;

    let product = await productService.update(id, body);
    if (product){
      res.json(product);
    }
  }
  catch(error) {
    next(error);
  }


})

productsRouter.delete('/:id', async (req, res) => {

  const {id} = req.params;

  let response = await productService.delete(id);

  res.json(response);
})

export default productsRouter;
