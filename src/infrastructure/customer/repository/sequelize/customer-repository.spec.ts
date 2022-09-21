import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import CustomerRepository from './customer-repository';

describe("Customer repository unit test",()=>{

    let sequelize: Sequelize;

    //Hooks beforeEach, AfterEach
    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
      });
    
      afterEach(async () => {
        await sequelize.close();
      });

      it("Should create customer", async () =>{

        const customer = new Customer("c1","Bruno");
        const address = new Address("Street 1",2,"88790000","new city");
        const customerRepository = new CustomerRepository();
        
        customer.changeAddress(address);

        customerRepository.create(customer);

        const foundCustomer = await CustomerModel.findOne({where:{id: customer.id}});

        expect(foundCustomer.toJSON()).toStrictEqual({
          id: customer.id,
          name: customer.name,
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city,
          active: customer.isActive(),
          rewardPoints: customer.rewardPoints
        });
      });

      it("Should update customer", async()=>{
        const customer = new Customer("c1","Bruno");
        const address = new Address("Street 1",2,"88790000","new city");
        const customerRepository = new CustomerRepository();
        
        customer.changeAddress(address);

        customerRepository.create(customer);

        customer.changeName("Updated name");
        customer.deactivate();
        customer.addRewardPoints(50);
        customer.changeAddress(new Address("Street 2",4,"88708081","updated city"));

        await customerRepository.update(customer);

        const foundCustomer = await CustomerModel.findOne({where:{id: customer.id}});

        expect(foundCustomer.toJSON()).toStrictEqual({
          id: customer.id,
          name: customer.name,
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city,
          active: customer.isActive(),
          rewardPoints: customer.rewardPoints
        });

      });

      it("Should to find customer by id", async()=>{
        
        const customer = new Customer("c1","Bruno");
        const address = new Address("Street 1",2,"88790000","new city");
        const customerRepository = new CustomerRepository();
        
        customer.changeAddress(address);

        customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where:{id: customer.id}});

        const foundCustomer = await customerRepository.find(customer.id);

        expect(customerModel.toJSON()).toStrictEqual({
          id: foundCustomer.id,
          name: foundCustomer.name,
          street: foundCustomer.Address.street,
          number: foundCustomer.Address.number,
          zip: foundCustomer.Address.zip,
          city: foundCustomer.Address.city,
          active: foundCustomer.isActive(),
          rewardPoints: foundCustomer.rewardPoints
        });

      });

      it("Should to find all customers", async() =>{

        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("c1","Bruno 1");
        const address1 = new Address("Street 1",2,"88790000","new city 1");

        const customer2 = new Customer("c2","Bruno 2");
        const address2 = new Address("Street 2",4,"88701071","new city 1");

        const customer3 = new Customer("c3","Bruno 3");
        const address3 = new Address("Street 3",6,"88708000","new city 3");

        customer1.changeAddress(address1);
        customer2.changeAddress(address2);
        customer3.changeAddress(address3);

        customerRepository.create(customer1);
        customerRepository.create(customer2);
        customerRepository.create(customer3);

        const customers = [customer1, customer2, customer3];

        const foundedCustomers = await customerRepository.findAll();

        expect(customers).toEqual(foundedCustomers);

      });
});