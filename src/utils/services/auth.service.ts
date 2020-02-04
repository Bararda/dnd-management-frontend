import Api from "./api";
export default class AuthService extends Api {
    constructor() {
        super();
    }
    async login(username: string, password: string) {
        const response = await this.post("/auth/login", {
            username,
            password
        });
        if (response.success) {
            window.localStorage.setItem("authenticated", "true");
            this.refreshToken(response.expiresIn);
            return true;
        }
        return false;
    }
    async refreshToken(expiry: number) {
        setTimeout(async ()=> {
            const response = await this.get("/auth/reissueToken");
            if (response.success) {
                this.refreshToken(response.expiresIn);
            } else {
                window.localStorage.setItem("authenticated", "false");
            }
        }, expiry);
    }

}

