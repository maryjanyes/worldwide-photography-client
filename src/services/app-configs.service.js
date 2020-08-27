import { setAppLanguage } from "reducers/actions/ui.actions";

class AppConfigsService {
  constructor() {
    this.activeLang = localStorage.getItem("appLang") || appLangs.EN;
  }

  selectAppLang(newLang, dispatch) {
    this.activeLang = newLang;
    localStorage.setItem("appLang", newLang);
    dispatch(setAppLanguage(newLang));
  }

  getActiveLang() {
    return this.activeLang || localStorage.getItem("appLang");
  }
}

export const appLangs = {
  UA: "UA",
  EN: "EN",
};

export default new AppConfigsService();
