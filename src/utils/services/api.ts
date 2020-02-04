import Observable from "../helpers/observable";
export default class Api extends Observable {
    private endPointURL = 'http://localhost:8080'
    constructor() {
        super();
    }
    protected async get(endPoint: string, query: any = {}) {
        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    protected async post(endPoint: string, obj: any) {
        console.log(this.endPointURL, endPoint, obj);
        const response = await fetch(this.endPointURL + endPoint, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    protected async put(endPoint: any, updates: any, query:any = {}) {
        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url.toString(), {
            method: "PUT",
            body: JSON.stringify(updates),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    protected async delete(endPoint: string, query: any = {}) {
        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url.toString(), {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
}
