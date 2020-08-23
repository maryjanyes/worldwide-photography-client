export const mergeContestsWithPhotos = (contestID, submittions, photos) => {
  // const contestSubmittions = getSubmittionsByContestID(submittions, contestID);
  return [].map(({ photo_id }) => photos.find((p) => p.photo_id == photo_id));
};

export const getAnnouncements = (announcements, contestID) =>
  announcements.filter(({ contest_id }) => contest_id === contestID);

export const getContestJudle = (judles, contestID) =>
  judles.find(({ contest_id }) => contest_id === contestID);

export const getSubmittionsByContestID = (submittions, contestID) =>
  submittions.filter(({ contest_id }) => contest_id === contestID);

export const getContestImage = (images, imageID) =>
  images.find(({ avatar_id }) => avatar_id === imageID) ||
  "http://localhost:3000/assets/images/pane2.jpg";
