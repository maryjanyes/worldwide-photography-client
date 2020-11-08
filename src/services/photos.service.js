import { ApiService } from "./api.service";

export class PhotosService extends ApiService {
  async getPhotos() {
    return await this.fetchJSONData("photos");
  }

  async getPhotoCategories() {
    return await thid.fetchJSONData("photos/categories");
  }
}

export default new PhotosService();
