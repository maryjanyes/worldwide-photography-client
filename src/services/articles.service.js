import { ApiService } from "./api.service";

class ArticlesService extends ApiService {
  constructor() {
    super();
  }

  getArticles() {
    return this.fetchJSONData("articles");
  }
}

export default new ArticlesService();
