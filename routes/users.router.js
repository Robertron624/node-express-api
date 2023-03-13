import express from "express";
import { faker } from '@faker-js/faker';

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  const { limit } = req.query;

  const users = []

  let myLimit;

  if (limit) {
    myLimit = limit
  } else {
    myLimit = 10
  }

  for(let i = 0; i < myLimit; i++) {
    users.push({
      username: faker.name.firstName(),
      vehicle: faker.vehicle.vehicle(),
    })
  }

  res.json(users)

});

export default userRouter;
