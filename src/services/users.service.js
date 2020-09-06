import { ApiService } from "./api.service";

export class UsersService extends ApiService {
  constructor() {
    super();
  }

  async getJudles() {
    return await this.fetchJSONData("judles");
  }
}

export default new UsersService();
