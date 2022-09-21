import Address from '../../domain/customer/value-object/address';
import Customer from '../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../domain/customer/repository/customer-repository.interface';
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{
    async create(entity: Customer): Promise<void> {
        CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }
    async update(entity: Customer): Promise<void> {
        CustomerModel.update({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        },
        {
            where:{
            id: entity.id,
        }
    });
    }
    async find(id: string): Promise<Customer> {
       const foundCustomerById = await CustomerModel.findOne({where: {id: id}})
       const customer = new Customer(foundCustomerById.id,foundCustomerById.name);
       customer.addRewardPoints(foundCustomerById.rewardPoints);

       if(foundCustomerById.active) customer.isActive();

       const address = new Address(foundCustomerById.street,foundCustomerById.number,foundCustomerById.zip, foundCustomerById.city);
       customer.changeAddress(address);

       return customer;
    }
    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return   customers.map(result => {
            const customer = new Customer(result.id,result.name);
            customer.addRewardPoints(result.rewardPoints);
     
            if(result.active) customer.isActive();
     
            const address = new Address(result.street,result.number,result.zip, result.city);
            customer.changeAddress(address);

            return customer;
        });
    }

}