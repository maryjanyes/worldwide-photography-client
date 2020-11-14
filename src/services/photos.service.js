import { ApiService } from "./api.service";

export class PhotosService extends ApiService {
  async getPhotos() {
    return await this.fetchJSONData("images");
  }

  async getPhotoCategories() {
    return await thid.fetchJSONData("images/categories");
  }
}

export default new PhotosService();
