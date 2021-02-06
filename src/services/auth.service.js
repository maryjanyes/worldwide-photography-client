import { ApiService } from "./api.service";

class AuthService extends ApiService {
  constructor() {
    super();
  }

  async auth(data) {
    data.email = data.emailOrUsername || data.email;
    const response = await this.insertData(data, "users/auth");
    const responsePayload = response.json();
    return responsePayload;
  }

  async register(data) {
    const response = await this.insertData(data, "users/register");
    const responsePayload = response.json();
    return responsePayload;
  }

  async logOut() {
    const response = await this.signOut();
    const responsePayload = response.json();
    return responsePayload;
  }
}

export default new AuthService();
