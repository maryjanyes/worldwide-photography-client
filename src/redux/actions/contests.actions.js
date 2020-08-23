export const setContests = (payload) => {
  return {
    type: "[CONTESTS] SET_CONTESTS",
    payload,
  };
};

export const setUploadedImage = (payload) => {
  return {
    type: "[CONTESTS] UPDATE_SUBMITTION_PHOTO",
    payload,
  };
};
