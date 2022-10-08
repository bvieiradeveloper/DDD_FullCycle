import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";


export default class ListCustomerUseCase {

    private customerRepository : CustomerRepositoryInterface
    constructor(customerRepository: CustomerRepositoryInterface) {
            this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto) : Promise<OutputListCustomerDto>{
        const customer = await this.customerRepository.findAll();
        console.log(customer);
        return OutputMapper.toOutput(customer);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
      return {
        customers: customer.map((customer) => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.Address._street,
            number: customer.Address.number,
            zip: customer.Address.zip,
            city: customer.Address.city,
          },
        })),
      };
    }
  }