class AuthService {
    constructor() {
        this.api = new Api();
    }
    async login(username, password) {
       let results = await this.api.post('', {username, password});
       console.log(results);
    }
}