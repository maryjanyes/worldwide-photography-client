import { apiService } from "services/api.service";
import appConfigsService, { appLangs } from "services/app-configs.service";

export const getAnnouncements = (announcements, contestID) =>
  announcements.filter(({ contest_id }) => contest_id === contestID);

export const getContestImage = (images, imageID) =>
  images.find(({ avatar_id }) => avatar_id === imageID) ||
  "http://localhost:3000/assets/images/pane2.jpg";

export const buildDropdownOptions = (items) => {
  return items.map((i, iIndex) => ({
    valueText:
      appConfigsService.getActiveLang() === appLangs.EN ? i.en_name : i.ua_name,
    valueID: iIndex,
  }));
};

export const getTimeToContestEnd = (current, endedAt) => {
  return new Date(endedAt - current);
};

export const getPhotoUrlFromPhotoObject = (photoObject) =>
  photoObject.link_to_file ||
  photoObject.link_to_instagram ||
  photoObject.link_to_facebook;

export const pathToPhoto = (path) => {
  return `${apiService.BACKEND_ENDPOINT}/photos/${path}`;
};
