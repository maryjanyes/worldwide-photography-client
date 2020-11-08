import { ApiService } from "./api.service";

export class UsersService extends ApiService {
  constructor() {
    super();
  }

  async getJudles() {
    return await this.fetchJSONData("users/judles");
  }

  async getUsers() {
    return await this.fetchJSONData("users");
  }
}

export default new UsersService();
