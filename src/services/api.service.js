import navLinks from "mocks/nav-links";
import signItems from "mocks/sign-items";

export class ApiService {
  constructor() {
    const { BACKEND_URL } = process.env;
    this.BACKEND_ENDPOINT = BACKEND_URL || "http://localhost:3000";
  }

  async fetchJSONData(entryPath) {
    const url = `${this.BACKEND_ENDPOINT}/${entryPath}`;
    const response = await fetch(url, { mode: "cors" });
    return response.json();
  }

  fetchTextData(entryPath) {
    const response = fetch(`${this.BACKEND_ENDPOINT}/${entryPath}`);
    return response.text();
  }

  insertData(payload, entryPath, headers) {
    return fetch(`${this.BACKEND_ENDPOINT}/${entryPath}`, {
      body: JSON.stringify(payload),
      headers,
    });
  }

  static getContestItemLinks() {
    return [];
  }

  static getNavLinks() {
    return navLinks;
  }

  static getSignItems() {
    return signItems;
  }
}

export const apiService = new ApiService();
