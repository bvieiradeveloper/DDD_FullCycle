import EventHandlerInterface from "../../../event/@shared/event-handler.interface";
import eventInterface from "../../../event/@shared/event.interface";
import ProductCreatedEvent from "../product-created.event";

export default class  SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: eventInterface): void {
        console.log("Send mail to ...");
    }

}