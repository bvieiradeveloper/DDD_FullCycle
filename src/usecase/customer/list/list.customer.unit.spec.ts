import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usercase";

const customer1 = new Customer("123","John");
const address1 = new Address("Street", 123, "Zip", "City");
customer1.changeAddress(address1);


const customer2 = new Customer("456","Maria");
const address2 = new Address("Street 2", 125, "Zip 2", "City 2");
customer2.changeAddress(address2);

const MockRepository = () =>{
    return{
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue( Promise.resolve([customer1, customer2]))
    }
  }


  describe("Unit test for list customer use case",() =>{
    it("Should return customers", async() => {
        const customerRepository = MockRepository();
        const usecase = await new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    
    });
  })

