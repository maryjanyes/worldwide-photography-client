const initialState = {
  users: [],
};

export default function UsersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "[USERS] SET_USERS": {
      return {
        ...state,
        users: payload,
      };
    }
    default: {
      return state;
    }
  }
}
