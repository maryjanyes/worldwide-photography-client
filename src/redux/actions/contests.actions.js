export const setContests = (payload) => {
  return {
    type: "[CONTESTS] SET_CONTESTS",
    payload,
  };
};

export const setUploadedImage = (payload) => ({
  type: "[CONTESTS] UPDATE_SUBMITTION_PHOTO",
  payload,
});

export const setContestsPrizes = (payload) => ({
  type: "[CONTESTS] SET_CONTESTS_PRIZES",
  payload,
});
