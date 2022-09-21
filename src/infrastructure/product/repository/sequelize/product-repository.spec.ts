import { Sequelize } from "sequelize-typescript";
import Product from '../../domain/entity/product';
import ProductModel from "./product.model";
import ProductRepository from './product-repository';

describe("Product repository unit test",()=>{

    let sequelize: Sequelize;

    //Hooks beforeEach, AfterEach
    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

    it("Should create product",async ()=>{

      const productRepository =  new ProductRepository();
      const product = new Product("p1","product 1", 100);

      await productRepository.create(product);

      const createdProduct =  await ProductModel.findOne({ where: { id: product.id}});

      expect(createdProduct.toJSON()).toStrictEqual({
            id:product.id,
            name:product.name,
            price:product.price,
        });
    });

    it("Should update a product", async ()=>{
      const productRepository =  new ProductRepository();
      const product = new Product("p1","product 1", 100);
      await productRepository.create(product);
      const createdProduct =  await ProductModel.findOne({ where: { id: product.id}});

      expect(createdProduct.toJSON()).toStrictEqual({
            id:product.id,
            name:product.name,
            price:product.price,
        });

      product.changePrice(300);
      product.changeName("product 1 updated");

      productRepository.update(product);
      const updatedProduct =  await ProductModel.findOne({ where: { id: product.id}});


      expect(updatedProduct.toJSON()).toStrictEqual({
        id:product.id,
        name:product.name,
        price:product.price,
      });
    });

    it("Should find a product", async ()=>{
      const productRepository =  new ProductRepository();
      const product = new Product("p1","product 1", 100);

      await productRepository.create(product);

      const productModel =  await ProductModel.findOne({ where: { id: product.id}});
      const foundProduct  = await productRepository.find(product.id);

      expect(productModel.toJSON()).toStrictEqual({
        id:foundProduct.id,
        name:foundProduct.name,
        price:foundProduct.price,
      });
    })

    it("Should find  all", async ()=>{
      const productRepository =  new ProductRepository();
      const product1 = new Product("p1","product 1", 100);
      const product2 = new Product("p2","product 2", 200);
      const product3 = new Product("p3","product 3", 300);

      await productRepository.create(product1);
      await productRepository.create(product2);
      await productRepository.create(product3);
      
      const products = [product1,product2,product3];

      const foundProduct = await productRepository.findAll();

      expect(products).toEqual(foundProduct);
    })
})