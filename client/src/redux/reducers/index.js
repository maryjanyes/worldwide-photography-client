import { combineReducers } from 'redux';

import usersReducer from './users-reducer';
import contestsReducer from './contests-reducer';
import prizesReducer from './prizes-reducer';

export default combineReducers({
    users: usersReducer,
    contests: contestsReducer,
    prizes: prizesReducer,
});
