import { ApiService } from "./api.service";

export class PhotosService extends ApiService {
  async getPhotos() {
    return await this.fetchJSONData("images/submittions");
  }

  async getPhotoCategories() {
    return await this.fetchJSONData("images/categories");
  }
}

export default new PhotosService();
