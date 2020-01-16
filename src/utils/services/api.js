class Api {
    get(url, query = {}) {
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

    post(url, obj) {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(obj)
        });
        return await response.json();
    }

    put(url, query, updates) {
        url = new URL(url);
        Object.keys(query).forEach(key =>
            url.searchParams.append(key, query[key])
        );
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(updates)
        });
        return await response.json();
    }

    delete(url, query) {
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
