/* eslint-disable import/no-anonymous-default-export */
import { userConstants } from "../actions/constants";

const initialState = {
  error: "",
  message: "",
  loading: false,
  userRegistered: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      console.log("request reducer");
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      console.log("success reducer");
      state = {
        ...state,
        loading: false,
        userRegistered: true,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      console.log("failure reducer");
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }
  return state;
};
