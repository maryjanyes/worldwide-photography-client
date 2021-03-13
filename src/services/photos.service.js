import { ApiService } from "./api.service";

export class PhotosService extends ApiService {
  async getPhotosSubmittions() {
    return await this.fetchJSONData("photos/submittions");
  }

  async getPhotoCategories() {
    return await this.fetchJSONData("photos/categories");
  }

  async voteImageOrSubmittion(voteId) {
    return await this.fetchJSONData(`contests/submittions/vote/${voteId}`);
  }
}

export default new PhotosService();
