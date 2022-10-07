import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("Street",123, "Zip", "City"))

const input = {
    id: customer.id,
    name: "John Updated",
    address:{
        street: "Street Updated",
        city: "City Updated",
        number: 1234,
        zip: "Zip Updated"
    }
}

const MockRepository = () =>{
    return{
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn()
    }
  }


describe("Unit test update customer usecase", ()=>{

    it("Should update customer", async()=>{
        const customerRepository = MockRepository();
        const customerUseCase = new UpdateCustomerUseCase(customerRepository);
    
        const output =  await customerUseCase.execute(input);
    
        await expect(output).toEqual(input);
    });
});