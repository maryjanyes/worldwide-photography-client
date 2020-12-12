import { ApiService } from "./api.service";

export class ContestsService extends ApiService {
  static getContestDetailsTemplate(
    GeneralInfoComponent,
    ResultsComponent,
    AnnouncementsComponent,
    { selectedContest, generalBlockTitle, resultsBlockTitle, newsBlockTitle }
  ) {
    return [
      {
        name: 'pages.contest_details.tabs.general',
        Comp: GeneralInfoComponent,
        props: { selectedContest, title: generalBlockTitle },
      },
      {
        name: 'pages.contest_details.tabs.results',
        Comp: ResultsComponent,
        props: { selectedContest, title: resultsBlockTitle },
      },
      {
        name: 'pages.contest_details.tabs.news',
        Comp: AnnouncementsComponent,
        props: { selectedContest, title: newsBlockTitle },
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
}

export default new ContestsService();
