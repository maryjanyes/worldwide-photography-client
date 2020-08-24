import { ApiService } from "./api.service";

class AuthService extends ApiService {
  constructor() {
    super();
  }

  async auth(data) {
    data.email = data.emailOrUsername;
    const response = await this.insertData(data, "authenticate");
    const responsePayload = response.json();
    return responsePayload;
  }

  async register(data) {
    const response = await this.insertData(data, "register");
    const responsePayload = response.json();
    return responsePayload;
  }
}

export default new AuthService();
