import EventInterface from '../../event/@shared/event.interface';

export default class ProductCreatedEvent implements EventInterface{
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
    
}