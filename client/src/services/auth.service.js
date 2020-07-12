import { ApiService } from './api.service';

class AuthService extends ApiService {
    constructor() {
        super();
    }

    logIn(data) {
        return this.sendData('auth/sign-in', 'POST', data);
    }

    register(data) {
        return this.sendData('auth/register', 'POST', data);
    }
}

export default new AuthService();
