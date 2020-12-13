import { ApiService } from "./api.service";

export class PhotosService extends ApiService {
  async getPhotos() {
    return await this.fetchJSONData("images/submittions");
  }

  async getPhotoCategories() {
    return await this.fetchJSONData("images/categories");
  }

  async voteImageOrSubmittion(photoId, submittionId) {
    if (!submittionId) {
      return await this.insertData({}, `photos/vote/${photoId}`);
    }
    return await this.insertData({}, `contests/submittions/vote/${submittionId}/${photoId}`);
  }
}

export default new PhotosService();
