import express from "express";
import productsRouter from "./products.router.js";
import userRouter from "./users.router.js";
import categoriesRouter from "./categories.router.js";

function routerApi (app) {

  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/products', productsRouter)
  router.use('/users', userRouter)
  router.use('/categories', categoriesRouter)
}

export default routerApi;
