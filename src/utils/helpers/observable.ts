export default class Observable {
    observers: Array<any>;
    constructor() {
        this.observers = [];
    }

    attach(o: any) {
        this.observers.push(o)
    }
    detach(o: any) {
        this.observers = this.observers.filter(subscriber => subscriber !== o);
    }
    notify(data: any) {
        this.observers.forEach(o => o.update(data));
    }

}