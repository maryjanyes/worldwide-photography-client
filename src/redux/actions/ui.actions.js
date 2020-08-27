export const setTranslations = (payload) => ({
  type: "[UI] SET_TRANSLATIONS_DATA",
  payload,
});

export const setAppLanguage = (lang) => ({
  type: "[UI] SET_APP_LANGUAGE",
  payload: lang,
});
