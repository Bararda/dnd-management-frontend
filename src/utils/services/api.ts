export default class Api {

    private endPointURL = 'http://localhost:8080'

    protected async get(endPoint: string, query: any = {}) {
        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url.toString(), {
            credentials: "include",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    protected async post(endPoint: string, obj: any) {

        console.log(this.endPointURL, endPoint, obj);
        const response = await fetch(this.endPointURL + endPoint, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }

    protected async put(endPoint: any, updates: any, query:any = {}) {

        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url.toString(), {
            method: "PUT",
            body: JSON.stringify(updates),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }

    protected async delete(endPoint: string, query: any = {}) {

        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url.toString(), {
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
}
