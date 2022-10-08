import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";


export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressUpdatedEvent>{
    handle(event: CustomerAddressUpdatedEvent): void {
          console.log(`Endereço do cliente: ${event.eventData.customer_id}, ${event.eventData.customer_name} alterado para: ${event.eventData.endereco}`);
    }
}