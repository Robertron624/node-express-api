import { faker } from '@faker-js/faker';
import boom  from '@hapi/boom'

class ProductService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate () {

    const size = 100;

    for (let i = 0; i < size; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlocked : faker.datatype.boolean()
      });
    }
  }

  async create (data) {
    let newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }

    this.products.push(newProduct);
    return newProduct;
  }

  async find () {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products)
      },1000)
    })

  }

  async findOne (id) {

    let product = this.products.find(p => p.id === id);

    if(!product) {
      throw boom.notFound(`Product ${id} not found`);
    }
    if (product.isBlocked) {
      throw boom.conflict(`Product ${id} is blocked`);
    }
    return product

  }

  async update (id, data) {

    let productToUpdateIndex = this.products.findIndex(p => p.id === id);

    if(productToUpdateIndex === -1) {
      throw boom.notFound(`Product ${id} not found`);
    }

    const product = this.products[productToUpdateIndex];

    this.products[productToUpdateIndex] = {
      ...product,
      ...data
    }
    return this.products[productToUpdateIndex]

  }

  async delete (id) {

    let productToUpdateIndex = this.products.findIndex(p => p.id === id);

    if(productToUpdateIndex === -1) {
      throw new Error('product not found');
    }

    this.products.splice(productToUpdateIndex, 1)
    return { id }
  }

}

export default ProductService;
