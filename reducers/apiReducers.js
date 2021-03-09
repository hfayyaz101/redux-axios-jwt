import {
  API_LOADING,
  API_RETURN_MSG,
  API_CHANGE_VALUE,
  API_RESET_VALUE,
  API_PUSHED,
  POST,
  LIST,
  GET,
  SCAN,
  UNIVERSAL,
  COLOR_MODE,
  USER_APPEND_VALUE,
} from "./actions/apiActionTypes";

const initialState = {
  isLoading: false,
  message: "",
  universal: {},
  value: {},
  resetList: false, // can be used to make a call to server after axios actions usig useEffect.
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case API_RETURN_MSG:
      return {
        ...state,
        message: action.payload,
      };
    case UNIVERSAL:
      return {
        ...state,
        universal: { ...state.universal, ...action.payload },
      };
    case API_CHANGE_VALUE:
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
    case API_RESET_VALUE:
      return {
        ...state,
        value: {},
      };
    case POST:
      return {
        ...state,
        post_data: action.payload.data,
        resetList: !state.resetList,
      };

    // LIST Data
    case LIST:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
      };

    // GET Data
    case GET:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
        pushed: action.payload.push,
      };

    case API_PUSHED:
      return {
        ...state,
        pushed: action.payload.status,
      };

    // SCAN Data
    case SCAN:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
        resetList: !state.resetList,
      };
    case USER_APPEND_VALUE:
      localStorage.setItem("log_array", JSON.stringify(action.payload.value));
      return {
        ...state,
        log_array: action.payload.value,
      };

    case COLOR_MODE:
      localStorage.setItem("colorMode", action.payload.color);
      return {
        ...state,
        colorMode: action.payload.color,
      };

    default:
      return state;
  }
}
