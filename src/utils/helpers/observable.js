class Observable {
    constructor() {
        this.observers = [];
    }

    attach(o) {
        this.observers.push(o)
    }
    detach(o) {
        this.observers = this.observers.filter(subscriber => subscriber !== o);
    }
    notify(data) {
        this.observers.forEach(o => o.update(data));
    }

}