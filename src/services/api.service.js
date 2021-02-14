import navLinks from "mocks/nav-links";
import signLinks from "mocks/sign-links";
import categoriesLinks from "mocks/contest-categories-links";
import rightMenuItemLinks from "mocks/right-menu-item-links";

import { appLangs } from "services/app-configs.service";

console.log(BACKEND_URL, BACKEND_PORT, 'The backend url')

export class ApiService {
  constructor() {
    this.BACKEND_ENDPOINT = `${BACKEND_URL || 'localhost'}:${BACKEND_PORT}`;
    this.BACKEND_FILES_ENDPOINT = `${BACKEND_URL}:${BACKEND_FILE_SERVER_PORT}`;
    this.CLIENT_ENDPOINT = `${location.protocol}//${location.host}`;
    this.postHeaders = new Headers({
      "Content-Type": "application/json",
    });
  }

  addAuthToken(headers) {
    const sessionToken = localStorage.getItem('SessionToken');
    if (sessionToken) {
      headers.append('Authorization', `Bearer ${sessionToken}`);
    }
    return headers;
  }

  async fetchJSONData(entryPath) {
    const url = `${this.BACKEND_ENDPOINT}/${entryPath}`;
    const response = await fetch(url, {
      mode: "cors",
    });
    return response.json();
  }

  fetchTextData(entryPath) {
    const response = fetch(`${this.BACKEND_ENDPOINT}/${entryPath}`);
    return response.text();
  }

  insertData(payload, entryPath, headers = this.postHeaders) {
    return fetch(`${this.BACKEND_ENDPOINT}/${entryPath}`, {
      body: JSON.stringify(payload),
      headers,
      method: "POST",
      mode: "cors",
    });
  }

  signOut() {
    return fetch(`${this.BACKEND_ENDPOINT}/users/logOut`, {
      headers: this.addAuthToken(this.postHeaders),
      method: "POST",
      mode: "cors",
    });
  }

  insertContestImage(formData, contestName) {
    return new Promise(res => {
      return fetch(
        `${this.BACKEND_FILES_ENDPOINT}/uploadImage/contestSubmittions/${contestName}`,
        {
          body: formData,
          method: "POST",
          mode: "cors",
        }
      )
        .then(response => {
          response.json().then((data) => res(data));
        })
        .catch(err => res(err));
    });
  }

  async getPrivacy(lang) {
    return new Promise((resolve) => {
      return fetch(
        `assets/text/privacy-${(lang === appLangs.EN && "en.txt") || "ua.txt"}`
      ).then((data) => data.text().then((text) => resolve(text)));
    });
  }

  async getAppTranslations() {
    const response = await fetch(`${this.BACKEND_ENDPOINT}/translations`);
    return await response.json();
  }

  static getContestItemLinks() {
    return categoriesLinks;
  }

  static getNavLinks() {
    return navLinks;
  }

  static getSignItems() {
    return signLinks;
  }

  static getMenuItems() {
    return rightMenuItemLinks;
  }
}

export const apiService = new ApiService();
