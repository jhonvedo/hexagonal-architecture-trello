export interface IEventEmitter {
    publish<T>(key:string,data: T): void
    subscribe(key: string, listener: (...args: any[]) => void): void
    unsubscribe(key: string, listener: (...args: any[]) => void): void
}