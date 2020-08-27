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
        props: selectedContest,
      },
      {
        name: "Results",
        Comp: ResultsComponent,
        props: selectedContest,
      },
      {
        name: "News",
        Comp: AnnouncementsComponent,
      },
    ];
  }

  async getContets() {
    return await this.fetchJSONData("contests");
  }

  async getContetsDetails() {
    return await this.fetchJSONData("contests/details");
  }

  async getContestsPrizes() {
    return await this.fetchJSONData("contests/prizes");
  }

  async getContestsCategories() {
    return await this.fetchJSONData("contests/categories");
  }

  async getSubmittionsForContest(contestID) {
    return await this.fetchJSONData(`contests/submittions/${contestID}`);
  }

  async getContestsJudles() {
    return await this.fetchJSONData("contests/judles");
  }
}

export default new ContestsService();
