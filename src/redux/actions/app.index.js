import ContestsService from "services/contests.service";

import { setContests } from "./contests.actions";

export const initAppData = (dispatch) => {
  ContestsService.getContets().then((contestsData) => {
    ContestsService.getContetsSubmittions().then((contestsSubmittionsData) => {
      const contests = contestsData.map((c) => {
        const relatedDetail = contestsSubmittionsData.find(
          (cs) => cs.contest_details_id === c.contest_details_id
        );
        c = { ...c, ...relatedDetail };
        return c;
      });
      dispatch(setContests(contests));
    });
  });
  const type = "[APP] INIT_DATA";
  return {
    type,
  };
};
