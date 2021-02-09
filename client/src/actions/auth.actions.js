import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post("/signIn", {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post("/signOut");
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { token, user } });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to Login" },
      });
    }
  };
};

export const forgotPassword = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.FORGOT_PASS_REQUEST });
    const res = await axios.post("/forgotPass", {
      ...user,
    });

    if (res.status === 200) {
      console.log(res.data);
      dispatch({ type: authConstants.FORGOT_PASS_SUCCESS });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.FORGOT_PASS_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};
