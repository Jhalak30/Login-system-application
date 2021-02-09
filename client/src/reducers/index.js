import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducer from "./user.reducers";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducers,
});

export default rootReducer;
