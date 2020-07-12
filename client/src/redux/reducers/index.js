import { combineReducers } from 'redux';

import usersReducer from './users.reducer';
import contestsReducer from './contests.reducer';
import prizesReducer from './prizes.reducer';
import authReducer from './auth.reducer';
import photoReducer from './photo.reducer';

export default combineReducers({
    users: usersReducer,
    contests: contestsReducer,
    prizes: prizesReducer,
    auth: authReducer,
    photo: photoReducer, 
});
