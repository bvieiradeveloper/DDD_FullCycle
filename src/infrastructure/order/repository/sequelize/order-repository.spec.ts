import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import OrderItem from "../../domain/entity/ordem_item";
import Order from "../../domain/checkout/entity/order";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer-repository";
import OrderRepository from "./order-repository";
import ProductRepository from "./product-repository";

describe("Order repository unit test", () =>{

    let sequelize: Sequelize;
    
      beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([
          CustomerModel,
          OrderModel,
          OrderItemModel,
          ProductModel,
        ]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

      it("Should create a new order", async()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Bruno");
        const address = new Address("Street 1",2,"88790000","new city");
        customer.changeAddress(address);
        
        const productRepository = new ProductRepository();
        const product1 = new Product("p1","Product 1",250);
        const product2 = new Product("p2","Product 2",500);
        
        
        const  item1 = new OrderItem("it1","item 1", 200, product1.id,5);
        const  item2 = new OrderItem("it2","item 2", 1200, product2.id,2);

        const items = [item1, item2];

        const orderRepository = new OrderRepository();
        const order = new Order("o1",customer.id,items);

        customerRepository.create(customer);
        productRepository.create(product1);
        productRepository.create(product2);

        await orderRepository.create(order);

        const foundOrder = await OrderModel.findOne(
            {
                where:{id:order.id},
                include:["items"],
            });
        
            
        expect(foundOrder.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            items:[
                {
                     id: item1.id,
                     productId: item1.productId,
                     orderId: order.id,
                     price: item1.price,
                     quantity: item1.quantity,
                     name:item1.name
                },
                {
                    id: item2.id,
                    productId: item2.productId,
                    orderId: order.id,
                    price: item2.price,
                    quantity: item2.quantity,
                    name:item2.name
               }
            ],
            total: order.total(), 
        })
      });

      it("Should update order",async() =>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Bruno");
        const address = new Address("Street 1",2,"88790000","new city");
        customer.changeAddress(address);
        
        const productRepository = new ProductRepository();
        const product1 = new Product("p1","Product 1", 250);
        const product2 = new Product("p2","Product 2", 500);
        
        
        const  item1 = new OrderItem("it1","item 1", 200, product1.id, 5);
        const  item2 = new OrderItem("it2","item 2", 1200, product2.id, 2);
       
        const items = [item1, item2];

        const orderRepository = new OrderRepository();
        const order = new Order("o1",customer.id,items);

        customerRepository.create(customer);
        productRepository.create(product1);
        productRepository.create(product2);

        await orderRepository.create(order);

        item1.changeQuantity(152);

        order.updateItem(item1);

        await orderRepository.update(order);
 
        const foundOrder = await OrderModel.findOne(
            {
                where:{id:order.id},
                include:["items"],
            });
            
        expect(foundOrder.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            items:[
                {
                     id: item1.id,
                     productId: item1.productId,
                     orderId: order.id,
                     price: item1.price,
                     quantity: item1.quantity,
                     name:item1.name
                },
                {
                    id: item2.id,
                    productId: item2.productId,
                    orderId: order.id,
                    price: item2.price,
                    quantity: item2.quantity,
                    name:item2.name
               }
            ],
            total: order.total(), 
        })
      });

      it("Should find order by id",async() =>{

        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Bruno");
        const address = new Address("Street 1",2,"88790000","new city");
        customer.changeAddress(address);
        
        const productRepository = new ProductRepository();
        const product1 = new Product("p1","Product 1",250);
        const product2 = new Product("p2","Product 2",500);
        
        const  item1 = new OrderItem("it1","item 1", 200, product1.id,5);
        const  item2 = new OrderItem("it2","item 2", 1200, product2.id,2);
       
        const items = [item1, item2];

        const orderRepository = new OrderRepository();
        const order = new Order("o1",customer.id,items);

        customerRepository.create(customer);
        productRepository.create(product1);
        productRepository.create(product2);
       
      
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne(
            {
                where:{id: order.id }, 
                include:["items"]
            }
        );

        const foundOrder = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customerId: foundOrder.customerId,
            items: foundOrder.items.map((item) =>(
                {
                    id: item.id,
                    productId: item.productId,
                    orderId: foundOrder.id,
                    price: item.price,
                    quantity: item.quantity,
                    name:item.name
                }
            )),
            total: foundOrder.total(), 
        })
      });

      it("Should find all orders",async()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1","Bruno");
        const address = new Address("Street 1",2,"88790000","new city");
        customer.changeAddress(address);

        const customer2 = new Customer("c2","Bruno 2");
        const address2 = new Address("Street 2",4,"88708071","new city 2");
        customer2.changeAddress(address2);
        
        const productRepository = new ProductRepository();
        const product1 = new Product("p1","Product 1",250);
        const product2 = new Product("p2","Product 2",500);
        
        const  item1 = new OrderItem("it1","item 1", 200, product1.id,5);
        const  item2 = new OrderItem("it2","item 2", 1200, product2.id,2);
       
        const  item3 = new OrderItem("it3","item 3", 2200, product1.id,7);
        const  item4 = new OrderItem("it7","item 4", 15200, product2.id,10);

        const itemsA = [item1, item2];
        const itemsB = [item3, item4];

        const orderRepository = new OrderRepository();
        const order1 = new Order("o1",customer.id, itemsA);
        const order2 = new Order("o2",customer2.id, itemsB);

        customerRepository.create(customer);
        customerRepository.create(customer2);
        productRepository.create(product1);
        productRepository.create(product2);
       
      
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = [order1, order2];

         const foundOrders = await orderRepository.findAll();

         expect(foundOrders).toEqual(orders);
      });
});




