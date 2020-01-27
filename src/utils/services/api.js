export default class Api {
    endPointURL = 'http://localhost:8080'
    async get(endPoint, query = {}) {
        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    async post(endPoint, obj) {
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

    async put(endPoint, query = {}, updates) {
        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updates),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    async delete(endPoint, query = {}) {
        const url = new URL(this.endPointURL + endPoint);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
}
