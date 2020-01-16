class Api {
    endPointURL = 'localhost:8080/'
    constructor() {

    }
    async get(url, query = {}) {
        url = new URL(url);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    }

    async post(url, obj) {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    }

    async put(url, query = {}, updates) {
        url = new URL(url);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updates),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    }

    async delete(url, query = {}) {
        url = new URL(url);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    }
}
