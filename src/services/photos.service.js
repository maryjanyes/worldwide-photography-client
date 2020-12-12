import { ApiService } from "./api.service";

export class PhotosService extends ApiService {
  async getPhotos() {
    return await this.fetchJSONData("images/submittions");
  }

  async getPhotoCategories() {
    return await this.fetchJSONData("images/categories");
  }

  async thumbUpPhoto(imageId) {
    return await this.insertData(`vote/${imageId}`);
  }
}

export default new PhotosService();
