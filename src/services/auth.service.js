import { ApiService } from "./api.service";

class AuthService extends ApiService {
  constructor() {
    super();
  }

  async auth(data) {
    data.email = data.emailOrUsername || data.email;
    const response = await this.insertData(data, "users/auth");
    return response.json();
  }

  async register(data) {
    const response = await this.insertData(data, "users/register");
    return response.json();
  }

  async logOut() {
    try {
      const response = await this.signOut();
      return response.json();
    } catch(err) {
      console.log('Cant logout:', err);
    }
  }

  async findUserByEmail(email) {
    const response = await this.fetchJSONData(`users/find-by-email/${email}`);
    return response?.data?.user;
  }
}

export default new AuthService();
