import Address from '../customer/value-object/address';
import Customer from '../customer/entity/customer';
import CustomerCreatedEvent from '../customer/event/customer-created.event';
import EnviaConsoleLog1Handler from '../customer/event/handler/envia-console-log-1.handler';
import EnviaConsoleLog2Handler from '../customer/event/handler/envia-console-log-2.handler';
import EnviaConsoleLogHandler from '../customer/event/handler/envia-console-log.handler';
import SendEmailWhenProductIsCreatedHandler from '../product/event/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../product/event/product-created.event';
import EventDispacher from './event-dispacher';
import CustomerAddressUpdatedEvent from '../../entity/customer/customer-address-updated.event';
describe("Domain events tests",() => {

    it("Should register a product created event handler", () =>{
        const eventDispacher = new EventDispacher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispacher.register("ProductCreatedEvent",eventHandler);
        
        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    
    it("Should register a customer created event handler", () =>{
        const eventDispacher = new EventDispacher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispacher.register("CustomerCreatedEvent",eventHandler1);
        eventDispacher.register("CustomerCreatedEvent",eventHandler2);

        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();

        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    });

    it("Should unregister a product created event handler", () => {

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispacher.register("ProductCreatedEvent",eventHandler);

        eventDispacher.unregister("ProductCreatedEvent",eventHandler);

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("Should unregister a customer created event handler", () => {

        const eventDispacher = new EventDispacher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispacher.register("CustomerCreatedEvent",eventHandler1);
        eventDispacher.register("CustomerCreatedEvent",eventHandler2);
      

        eventDispacher.unregister("CustomerCreatedEvent",eventHandler1);
        eventDispacher.unregister("CustomerCreatedEvent",eventHandler2);

        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });

    
    it("Should unregister all product created event handlers", () => {

        const eventDispacher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispacher.register("ProductCreatedEvent",eventHandler);

        eventDispacher.unregisterAll();

        expect(eventDispacher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("Should unregister all customer created event handlers", () => {

        const eventDispacher = new EventDispacher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispacher.register("CustomerCreatedEvent",eventHandler1);
        eventDispacher.register("CustomerCreatedEvent",eventHandler2);

        eventDispacher.unregisterAll();

        expect(eventDispacher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });


    it("Should notify all product created event handlers", () => {
        const eventDispatcher = new EventDispacher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
          });
        
          // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("Should notify all customer created event handlers", () => {
       
        const eventDispatcher = new EventDispacher();

        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent",eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent",eventHandler2);

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler1, "handle");

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "customer 1",
            description: "new customer",
          });
        
        eventDispatcher.notify(customerCreatedEvent);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("Should log when customer created event handlers 1 is called", () => {
        const eventDispatcher = new EventDispacher();

        const eventHandler = new EnviaConsoleLog1Handler();

        eventDispatcher.register("CustomerCreatedEvent",eventHandler);

        const spyEventHandler1 = jest.spyOn(console, 'log');

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "customer 1",
            description: "new customer",
          });
        
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();

        expect(spyEventHandler1).toHaveBeenCalledWith(expect.stringContaining("Esse é o primeiro console.log do evento: CustomerCreated"));
    });

    
    it("Should log when customer created event handlers 2 is called", () => {
        const eventDispatcher = new EventDispacher();

        const eventHandler = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CustomerCreatedEvent",eventHandler);

        const spyEventHandler = jest.spyOn(console, 'log');

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "customer 2",
            description: "new customer",
          });
        
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

        expect(spyEventHandler).toHaveBeenCalledWith(expect.stringContaining("Esse é o segundo console.log do evento: CustomerCreated"));
    });
    it("Should log when customer address updated event handlers is called", () => {

        const eventDispatcher = new EventDispacher();

        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerAddressUpdatedEvent",eventHandler);
       
        const spyEventHandler = jest.spyOn(console, 'log');

        const customer = new Customer("1","Customer 1")
        const address = new Address("Street 1",123,"13330-250","São Paulo")

        const event = new CustomerAddressUpdatedEvent({
            customer_id : customer.id,
            customer_name : customer.name,
            endereco : address.toString(),
        });

        customer.changeAddress(address);
        eventDispatcher.notify(event);

         expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledWith(expect.stringContaining(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${address.toString()}`));
    });
});