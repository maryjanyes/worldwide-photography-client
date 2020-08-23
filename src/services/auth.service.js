import { ApiService } from "./api.service";

class AuthService extends ApiService {
  constructor() {
    super();
  }

  auth(data) {
    console.log(data);
    return this.insertData(data, "/authenticate")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  register(data) {
    return this.insertData(data, "/register")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
}

export default new AuthService();
