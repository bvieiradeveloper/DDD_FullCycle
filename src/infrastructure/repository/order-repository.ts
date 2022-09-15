
import Order from '../../domain/entity/order';
import order from '../../domain/entity/order';
import OrderRepositoryInterface from '../../domain/repository/order-repository.interface';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItem from '../../domain/entity/ordem_item';

export default class OrderRepository implements OrderRepositoryInterface{
    async create(entity: order): Promise<void> {
        await OrderModel.create(
            {
              id: entity.id,
              customerId: entity.customerId,
              total: entity.total(),
              items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
            {
              include: [{ model: OrderItemModel }],
            }
          );
    }
    async update(entity: order): Promise<void> {
       
        await OrderModel.update(
            {
              id: entity.id,
              customerId: entity.customerId,
              total: entity.total(),
            },
            {
              where: {id:  entity.id}
            }
        );

        entity.items.forEach(async item=>{
            await OrderItemModel.update({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
            },
            {
                where:{id: item.id}
            })
        });
    }

    async find(id: string): Promise<order> {
        const foundOrder =  await OrderModel.findOne(
            {
                where:{id: id }, 
                include:["items"]
            }
        );

        const order = new Order(foundOrder.id,foundOrder.customerId, foundOrder.items.map(item=>{
            return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
        }));

        return order;
    }

    async findAll(): Promise<order[]> {
        const foundOrders =  await OrderModel.findAll(
            {
                include:["items"]
            }
        );
        return foundOrders.map(order=>{
            return new Order(order.id,order.customerId,order.items.map(item=>{
                return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
            }))
        })
    }
}