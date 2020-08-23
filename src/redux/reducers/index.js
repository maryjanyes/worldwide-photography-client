import { combineReducers } from "redux";

import usersReducer from "./users.reducer";
import contestsReducer from "./contests.reducer";
import authReducer from "./auth.reducer";
import photosReducer from "./photos.reducer";
import articlesReducer from "./articles.reducer";
import uiReducer from "./ui.reducer";

export default combineReducers({
  users: usersReducer,
  contests: contestsReducer,
  auth: authReducer,
  photos: photosReducer,
  articles: articlesReducer,
  ui: uiReducer,
});
