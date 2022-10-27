import {
  GET_ALL_COWS,
  POST_COW,
  PUT_COW,
  DELETE_COW,
  CLEAR_STATE,
  GET_COW_DETAIL,
} from '../actions/actionTypes';

//definition of an initial state

const initialState = {
  cows: [],
  detail: {},
  wasCowCreated: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COWS:
      return {
        ...state,
        cows: action.payload,
      };
    case GET_COW_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case POST_COW:
      return {
        ...state,
        wasCowCreated: action.payload,
      };
    case PUT_COW:
      return {
        ...state,
        detail: action.payload,
      };
    case DELETE_COW:
      return {
        ...state,
      };
    case CLEAR_STATE:
      return {
        ...state,
        cows: [],
      };
    default:
      return state;
  }
}

export default rootReducer;
