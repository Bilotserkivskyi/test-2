import { NAVIGATION } from '../actions';

const initialState = {
  headerPath: null,
  logged: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION.CHANGE_HEADER:
      return {
        ...state,
        headerPath: action.headerPath,
        logged: action.logged,
      };

    default:
      return state;
  }
};
