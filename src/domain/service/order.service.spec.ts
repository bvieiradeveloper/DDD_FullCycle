import Order from '../entity/order';
import OrderItem from '../entity/ordem_item';
import OrderService from './order.service';
import Customer from '../entity/customer';
describe("Order service unit test",()=>{

    it("Should place an order",() => {

        const customer = new Customer("c1","Customer 1");
        const item1 =  new OrderItem("i1","Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer,[item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
    it("Should get total of all orders",()=>{

        const item1 =  new OrderItem("i1","Item 1", 100, "p1", 1);
        const item2 =  new OrderItem("i2","Item 2", 200, "p2", 2);

        const order1 = new Order("o1","c1",[item1]);
        const order2 = new Order("o2","c2",[item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    
    });
})