import { ApiService } from './api.service';

class AuthService extends ApiService {
    constructor() {
        super('http://localhost:5000/web/v1');
    }

    logIn(data, context = {}) {
        return this.sendData.call(context, 'auth/sign-in', 'POST', data);
    }

    register(data, context = {}) {
        return this.sendData.call(context, 'auth/register', 'POST', data);
    }
}

export default new AuthService();
