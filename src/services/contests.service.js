import { ApiService } from "./api.service";

export class ContestsService extends ApiService {
  static getContestDetailsTemplate(
    GeneralInfoComponent,
    ResultsComponent,
    AnnouncementsComponent,
    selectedContest
  ) {
    return [
      {
        name: "General info",
        Comp: GeneralInfoComponent,
        props: {
          selectedContest,
        },
      },
      {
        name: "Results",
        Comp: ResultsComponent,
        props: {
          selectedContest,
        },
      },
      {
        name: "News",
        Comp: AnnouncementsComponent,
      },
    ];
  }

  submitContestImage(userData, image, imageDescription) {
    const data = new FormData();
    data.append("image", image);
    data.append("imageDescription", imageDescription);
    data.append("email", userData.email);

    console.log(data.getAll());
  }

  async getContets() {
    return await this.fetchJSONData("contests");
  }

  async getContetsSubmittions() {
    return await this.fetchJSONData("contests/details");
  }
}

export default new ContestsService();
