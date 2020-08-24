import { ApiService } from "./api.service";

export class PhotosService extends ApiService {
  async getPhotos() {
    return await this.fetchJSONData("photos");
  }
}

export default new PhotosService();
