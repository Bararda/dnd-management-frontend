import Api from './api';

export default class AuthService {
    
    async login(username, password) {
        const response = await Api.post('/auth/login', {
            username,
            password
        });
        if (response.success) {
            window.localStorage.setItem('authenticated', 'true');
            this.refreshToken(response.expiresIn);
            return true;
        }
        return false;
    }
    //TODO
    async refreshToken(expiry) {
        setTimeout(async ()=> {
            const response = await Api.get('/auth/reissueToken');
            if (response.success) {
                console.log(response);
                this.refreshToken(response.expiresIn);
            } else {
                window.localStorage.setItem('authenticated', 'false');
            }
        }, expiry - 1000);
    }

}

