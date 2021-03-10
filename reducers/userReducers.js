import {
  USER_LOADING,
  USER_RETURN_MSG,
  LOGIN,
  USER_CHANGE_VALUE,
  LOGOUT,
} from "../actions/userActionTypes";

const initialState = {
  isLoading: false,
  message: "",
  id_token: "",
  user_data: [],
  value: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case USER_RETURN_MSG:
      return {
        ...state,
        message: action.payload,
      };
    case USER_CHANGE_VALUE:
      if (!action.payload.value) {
        return {
          ...state,
          value: {
            ...state.value,
            [action.payload.name]: null,
          },
        };
      } else {
        return {
          ...state,
          value: {
            ...state.value,
            [action.payload.name]: action.payload.value,
          },
        };
      }
    case LOGIN:
      if (action.payload.length === 0) {
        localStorage.setItem("user_data", "");
      } else {
        localStorage.setItem("user_data", JSON.stringify(action.payload));
      }
      return {
        ...state,
        id_token: action.payload.id_token,
        user_data: action.payload.userData,
      };
    case LOGOUT:
      localStorage.setItem("user_data", "");
      return {
        ...state,
        user_data: [],
        id_token: "",
      };
    default:
      return state;
  }
}
