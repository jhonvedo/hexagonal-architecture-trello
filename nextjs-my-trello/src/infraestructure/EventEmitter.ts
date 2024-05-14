import { IEventEmitter } from "my-trello-core/domain/shared/IEventEmitter";
import eventEmitter from "../lib/eventEmitter";

export class TrelloEventemitter implements IEventEmitter {
    publish<T>(key: string, data: T) {
        eventEmitter.emit(key,data);
    }
    subscribe(key: string, listener: (...args: any[]) => void) {
        eventEmitter.on(key,listener);
    }
    unsubscribe(key: string, listener: (...args: any[]) => void) {
        eventEmitter.off(key,listener);
    }
    
}