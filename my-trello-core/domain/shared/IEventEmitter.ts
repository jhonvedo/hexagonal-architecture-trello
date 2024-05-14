export interface IEventEmitter {
    publish<T>(key:string,data: T)
    subscribe(key: string, listener: (...args: any[]) => void)
    unsubscribe(key: string, listener: (...args: any[]) => void)
}