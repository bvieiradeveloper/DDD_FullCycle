import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: "customer",
    address:{
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip"
    }
}
const MockRepository = () =>{
    return{
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn()
    }
  }

describe("Create customer use case unit test",()=>{
    it("Should create a customer", async()=>{
        const customerRepository = MockRepository();
        const customerUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerUseCase.execute(input);
     
        expect(output).toEqual({
            id: expect.any(String),
            name: "customer",
            address:{
                street: "Street",
                number: 123,
                city: "City",
                zip: "Zip"
            }
        })

    });

    it("Should thrown an error when name is missing", async()=>{
        const customerRepository = MockRepository();
        const customerUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerUseCase.execute(input)).rejects.toThrowError("Name is required");
    })

    it("Should thrown an error when street is missing", async()=>{
        const customerRepository = MockRepository();
        const customerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerUseCase.execute(input)).rejects.toThrowError("Street is required");
    })
})