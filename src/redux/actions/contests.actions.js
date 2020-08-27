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

export const setContestsPrizesSuccess = (payload) => ({
  type: "[CONTESTS] SET_CONTESTS_PRIZES_SUCCESS",
  payload,
});

export const setRecentSubmittionSuccess = (payload) => ({
  type: "[CONTESTS] SET_RECENT_SUBMITTION_SUCCESS",
  payload,
});

export const setContestsJudlesSuccess = (payload) => ({
  type: "[CONTESTS] SET_CONTESTS_JUDLES_SUCCESS",
  payload,
});

export const setContestsCategoriesSuccess = (payload) => ({
  type: "[CONTESTS] SET_CONTESTS_CATEGORIES_SUCCESS",
  payload,
});
