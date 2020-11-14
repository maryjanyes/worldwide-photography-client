import { apiService } from "services/api.service";
import appConfigsService, { appLangs } from "services/app-configs.service";

export const getAnnouncements = (announcements, contestID) =>
  announcements.filter(({ contest_id }) => contest_id === contestID);

export const getContestImage = (images, imageID) =>
  images.find(({ avatar_id }) => avatar_id === imageID) ||
  "http://localhost:3000/assets/icons/pane2.jpg";

export const buildDropdownOptions = (items, language, translations) => {
  return items.map((i, iIndex) => ({
    value: translations[`${i.name}.${language.toLowerCase()}`],
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

export const isContestStarted = (started_at) => {
  const now = new Date(Date.now());
  const isoDateOfStart = new Date(started_at);
  return isoDateOfStart < now;
};

export const getPhotoUrlFromPhotoObject = (photoObject = {}) =>
  photoObject.link_to_file ||
  photoObject.link_to_instagram ||
  photoObject.link_to_facebook;

export const pathToPhoto = (path, defaultPath = "simple.png") => {
  if (!path || path === "photo_path") {
    return `${apiService.BACKEND_ENDPOINT}/images/${defaultPath}`;
  }
  return `${apiService.BACKEND_ENDPOINT}/images/${path}`;
};

export const pathToAsset = (path = "simple.png") =>
  `${apiService.BACKEND_ENDPOINT}/assets/icons/${path}`;

export const getOneFromData = (itemCollection, itemID, itemKey) => {
  if (itemCollection) {
    return itemCollection.find((c) => c[itemKey] === itemID);
  }
};

export const concatNameParts = ({ first_name, last_name }) =>
  `${first_name} ${last_name}`;

export const isDataValid = (response) => response.isSuccess;

export const getTranslationStr = (prefix, code) => {
  return `${prefix}.${code.toLowerCase()}`;
};
