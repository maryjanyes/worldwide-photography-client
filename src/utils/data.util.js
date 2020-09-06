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

export const getJudleFromID = (judles, judleID) =>
  !!judles && judles.find((j) => j.judle_id === judleID);

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export const getTimeToContestEnd = (endedAt) => {
  const now = new Date();
  const isoDateOfEnd = new Date(endedAt);
  let daysCount = 0;
  while (now < isoDateOfEnd) {
    daysCount++;
    now.setDate(now.getDate() + 1);
  }
  return daysCount;
};

export const getPhotoUrlFromPhotoObject = (photoObject = {}) =>
  photoObject.link_to_file ||
  photoObject.link_to_instagram ||
  photoObject.link_to_facebook;

export const pathToPhoto = (path) => {
  return `${apiService.BACKEND_ENDPOINT}/photos/${path}`;
};

export const concatNameParts = ({ first_name, last_name }) =>
  `${first_name} ${last_name}`;
