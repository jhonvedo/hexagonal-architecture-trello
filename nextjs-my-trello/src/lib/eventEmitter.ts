import { EventEmitter } from 'events';

(globalThis as any).globalEventEmitter = (globalThis as any).globalEventEmitter || new EventEmitter();

export default (globalThis as any).globalEventEmitter as EventEmitter;