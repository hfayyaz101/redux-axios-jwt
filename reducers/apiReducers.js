import {
  API_LOADING,
  API_RETURN_MSG,
  UNIVERSAL,
  API_CHANGE_VALUE,
  API_RESET_VALUE,
  POST,
  GET,
  DELETE,
} from "../actions/apiActionTypes";

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
    case GET:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
        pushed: action.payload.push,
      };
    case DELETE:
      return {
        ...state,
        [action.payload.name]: action.payload.response.data,
        resetList: !state.resetList,
      };
    default:
      return state;
  }
}
