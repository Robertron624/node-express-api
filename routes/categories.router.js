import express from "express";
import { faker } from '@faker-js/faker';

const categoriesRouter = express.Router()

categoriesRouter.get('/', (req, res) => {
  // const { categoryId, productId } = req.params;

  const categories = []

  for(let i = 0; i < 10; i++) {
    categories.push({
      categorieName: faker.commerce.department()
    })
  }

  res.json(categories);
});

export default categoriesRouter;
