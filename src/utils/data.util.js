import { apiService } from "services/api.service";

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

export const getUserByID = (users, userID) => {
  !!users && users.find(({ user_id }) => user_id === userID)
}

export const getJudleByID = (judles, judleID) =>
  !!judles && judles.find(({ judle_id }) => judle_id === judleID);

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

export const getTimeToEnd = endedAt => {
  const now = new Date();
  const isoDateOfEnd = new Date(endedAt);
  let daysCount = 0;
  while (now < isoDateOfEnd) {
    daysCount++;
    now.setDate(now.getDate() + 1);
  }
  return daysCount;
};

export const isTimePassed = timestamp => {
  const now = new Date(Date.now());
  const isoDateOfStart = new Date(timestamp);
  return isoDateOfStart < now;
};

export const getPhotoUrlFromPhotoObject = (photoObject = {}) =>
  photoObject.link_to_file ||
  photoObject.link_to_instagram ||
  photoObject.link_to_facebook;

export const pathToPhoto = (path, defaultPath = "simple.png", excludePrefix = false) => {
  if (!path || path === "photo_path") {
    return `${apiService.CLIENT_ENDPOINT}/assets/images/${defaultPath}`;
  }
  return `${apiService.BACKEND_ENDPOINT}/images/${excludePrefix ? path.replace('/', '') : path}`;
};

export const pathToAsset = (path = "simple.png") =>
  `${apiService.CLIENT_ENDPOINT}/assets/icons/${path}`;

export const getOneFromData = (itemCollection, itemID, itemKey) => {
  if (itemCollection) {
    return itemCollection.find(c => c[itemKey] === itemID);
  }
};

export const getPhotosForAccount = (photos, userID) =>
  photos && photos.length > 0 && photos.filter(photo => photo.user_id === userID);

export const concatNameParts = (judleData) =>
  `${judleData?.first_name} ${judleData?.last_name}`;

export const isDataValid = (response) => response.isSuccess;

export const getTranslationStr = (prefix, code) => {
  return `${prefix}.${code.toLowerCase()}`;
};
