import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { IEventEmitter } from "my-trello-core/domain/shared/IEventEmitter";

@Injectable()
export class EventEmitterService implements IEventEmitter  {

    private emitter: EventEmitter2;

    constructor() {
      this.emitter = new EventEmitter2();
    }
  
    publish<T>(key: string, data: T) {
      this.emitter.emit(key, data);
    }
  
    subscribe(key: string, listener: (...args: any[]) => void) {
      this.emitter.on(key, listener);
    }
  
    unsubscribe(key: string, listener: (...args: any[]) => void) {
      this.emitter.off(key, listener);
    }

}