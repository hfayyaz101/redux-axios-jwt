import { combineReducers } from "redux";
import userReducers from "./userReducers";
import apiReducers from "./apiReducers";

const rootReducer = combineReducers({
  user: userReducers,
  api: apiReducers,
});

export default rootReducer;
