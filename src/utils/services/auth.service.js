import Api from "./api";
export default class AuthService {
    constructor() {
        this.api = new Api();
    }
    async login(username, password) {
        const response = await this.api.post("/auth/login", {
            username,
            password
        });
        if (response.success) {
            window.localStorage.setItem("authenticated", true);
            this.refreshToken(response.expiresIn);
            return true;
        }
        return false;
    }
    async refreshToken(expiry) {
        setTimeout(async ()=> {
            const response = await this.api.get("/auth/reissueToken");
            if (response.success) {
                this.refreshToken(response.token, response.expiresIn);
            } else {
                window.localStorage.setItem("authenticated", false);
            }
        }, (expiry * 1000) - 1000);
    }

}

