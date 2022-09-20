import EventDispatcherInterface from './event-dispacher.interface';
import EventHandlerInterface from './event-handler.interface';
import eventHandlerInterface from './event-handler.interface';
import eventInterface from './event.interface';

export default class EventDispacher implements EventDispatcherInterface{

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
      
    notify(event: eventInterface): void {
        //new
       
        const eventName = event.constructor.name;
        console.log("vava",eventName)
        if(this.eventHandlers[eventName]){
            console.log("vava2",eventName)
            this.eventHandlers[eventName].forEach((eventHandler)=>{
                console.log(event);
                eventHandler.handle(event)
            })
        }
    }
    register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        console.log(this.eventHandlers[eventName])
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
            console.log(this.eventHandlers[eventName])
        }

        this.eventHandlers[eventName].push(eventHandler);
    }
    unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
       if(this.eventHandlers[eventName]){
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if(index !== -1)
            {
                this.eventHandlers[eventName].splice(index);
            }
       };
    }
    unregisterAll(): void {
        this.eventHandlers = {};
    }

}