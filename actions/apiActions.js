import axios from "axios";
import {
  API_LOADING,
  API_RETURN_MSG,
  UNIVERSAL,
  API_CHANGE_VALUE,
  API_RESET_VALUE,
  POST,
  GET,
  DELETE,
} from "./apiActionTypes";
import { LOGOUT } from "./userActionTypes";

// add `"proxy" : "https://localhost:8000"` in package.json file

/*
|--------------------------------------------------------------------------
| isLoading - Global to be used at the higher level of the application.
|--------------------------------------------------------------------------
|
| Params:
|       - status | type: boolean | default: false
|
| This action runs by default (if stateLoading = true), enabling to be
| run at parent component level. 
|
| This is linked with each action that makes an Axios call, hence follows
| following rules.
|
| - Before axios call           =>  true
| - Once returns a callback     =>  false
|
| let loading = useState((state) => state.api.isLoading)
*/
export const isLoading = (status) => (dispatch) => {
  dispatch({
    type: API_LOADING,
    payload: status,
  });
};

/*
|--------------------------------------------------------------------------
| returnMSG - Global msg for notification in return of a response.
|--------------------------------------------------------------------------
|
| Params:
|       - message | type: string | default: ""
|
| This action runs by default, enabling to be run at parent component 
| level. 
|
| This is linked with each action that makes an Axios call, hence follows
| following rules.
|
| - Once returns a callback     =>  msg from .then response.status_code
| .catch error.response.status
|
| let msg = useState((state) => state.api.message)
*/
export const returnMsg = (message) => (dispatch) => {
  dispatch({
    type: API_RETURN_MSG,
    payload: message,
  });
};

/*
|--------------------------------------------------------------------------
| isUniversal - Global universal data, can be accessible anywhere.
|--------------------------------------------------------------------------
|  
| Params:
|       - data | type: object | default: {}
|
| Get data inform of an object
|
| Can be accessed from anywhere.
| let universal = useState((state) => state.api.universal)
*/
export const isUniversal = (data) => (dispatch) => {
  dispatch({
    type: UNIVERSAL,
    payload: data,
  });
};

/*
|--------------------------------------------------------------------------
| changeValue - Dynamicly Adds new values and column into the Table
|--------------------------------------------------------------------------
|  
| Params:
|       - name  | type: string   | key value of the data
        - value | type: anything | value against the key.
|
| Stores any value against a key. Can be used in forms as handleChange.
|
| Can be accessed from anywhere.
| let value = useState((state) => state.api.value)
*/
export const changeValue = (name, value) => (dispatch) => {
  dispatch({
    type: API_CHANGE_VALUE,
    payload: {
      name,
      value,
    },
  });
};

/*
|--------------------------------------------------------------------------
| resetValue - Reset value to default {}
|--------------------------------------------------------------------------
|  
| Reset value of redux to default.
|
| Can be used once you are done using value param, for e.g. after
| completing form and submitting it to the post request.
|
| Its not called automatically by any other action.
|
| let value = useState((state) => state.api.value)
*/
export const resetValue = () => (dispatch) => {
  dispatch({
    type: API_RESET_VALUE,
  });
};

/*
|--------------------------------------------------------------------------
| postData - Sends post request and returns with an error or request.
|--------------------------------------------------------------------------
|  
| Params:
|       - data  | type: object  | request body
|       - link  | type: string  | call to be sent to a url.
|       - token | type: string  | null = not auth else token key.
|       - authorization | type: string | default = "basic"
|       - stateLoading  | type: boolean| default = true
|       
| let value = useState((state) => state.api[link])
*/
export const postData = (
  data,
  link,
  token,
  authorization = "basic",
  stateLoading = true
) => (dispatch) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }

  let request = {
    url: "/" + link + "/",
    method: "POST",
    headers: token
      ? {
          Authorization: authorization + " " + token,
        }
      : {},
    data: data,
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: POST,
        payload: response,
      });
      dispatch(isLoading(false));
      return response;
    })
    .catch((err) => {
      if (err.response.statusText === "Unauthorized") {
        dispatch({ type: LOGOUT });
      } else {
        dispatch(returnMsg(err));
        dispatch(isLoading(false));
      }
    });
};

/*
|--------------------------------------------------------------------------
| getData - Sends get request and returns with an error or request.
|--------------------------------------------------------------------------
|  
| Params:
|       - params  | type: string  | to be places at the end of the call
|       - link  | type: string  | call to be sent to a url.
|       - token | type: string  | null = not auth else token key.
|       - authorization | type: string | default = "basic"
|       - stateLoading  | type: boolean| default = true
|       
| let value = useState((state) => state.api["GET-" + link])
*/
export const getData = (
  params,
  link,
  token,
  authorization = "basic",
  stateLoading = true
) => (dispatch) => {
  stateLoading && dispatch(isLoading(true));

  let request = {
    method: "GET",
    url: `/${link}/${params}/`,
    headers: token
      ? {
          Authorization: authorization + " " + token,
        }
      : {},
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: GET,
        payload: {
          name: "GET-" + link,
          response,
        },
      });
      dispatch(isLoading(false));
      return response;
    })
    .catch((err) => {
      if (err && err.response.statusText === "Unauthorized") {
        dispatch({ type: LOGOUT });
      } else {
        dispatch(returnMsg(err));
        dispatch(isLoading(false));
        return err;
      }
    });
};

/*
|--------------------------------------------------------------------------
| getListData - Sends get request and returns with an error or request.
|--------------------------------------------------------------------------
|  
| Params:
|       - link  | type: string  | call to be sent to a url.
|       - token | type: string  | null = not auth else token key.
|       - authorization | type: string | default = "basic"
|       - stateLoading  | type: boolean| default = true
|       
| let value = useState((state) => state.api[link])
*/
export const getListData = (
  link,
  token,
  authorization = "basic",
  stateLoading = true
) => (dispatch) => {
  if (stateLoading === true) {
    dispatch(isLoading(true));
  }

  let request = {
    method: "GET",
    url: "/" + link + "/",
    headers: token
      ? {
          Authorization: authorization + " " + token,
        }
      : {},
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: GET,
        payload: {
          name: link,
          response,
        },
      });
      dispatch(isLoading(false));
      return response;
    })
    .catch((err) => {
      if (err && err.response && err.response.statusText === "Unauthorized") {
        dispatch({ type: LOGOUT });
      } else {
        dispatch(returnMsg(err));
        dispatch(isLoading(false));
      }
    });
};

/*
|--------------------------------------------------------------------------
| putDataParams - Sends put request with data and returns with an error 
| or request.
|--------------------------------------------------------------------------
|  
| Params:
|       - data  | type: object  
|       - link  | type: string  | call to be sent to a url.
|       - token | type: string  | null = not auth else token key.
|       - params| type: string  | params to be passed in url
|       - authorization | type: string | default = "basic"
|       - stateLoading  | type: boolean| default = true
|       
| let value = useState((state) => state.api[link])
*/
export const putDataParams = (
  data,
  link,
  params,
  token,
  authorization = "basic",
  stateLoading = true
) => (dispatch) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }

  let request = {
    url: "/" + link + "/" + params + "/",
    method: "PUT",
    headers: token
      ? {
          Authorization: authorization + " " + token,
        }
      : {},
    data: data,
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: POST,
        payload: response,
      });
      dispatch(isLoading(false));
      return response;
    })
    .catch((err) => {
      if (err.response.statusText === "Unauthorized") {
        dispatch({ type: LOGOUT });
      } else {
        dispatch(returnMsg(err));
        dispatch(isLoading(false));
      }
    });
};

/*
|--------------------------------------------------------------------------
| putDataSimple - Sends put request with data and returns with an error
| or request.
|--------------------------------------------------------------------------
|  
| Params:
|       - data  | type: object  
|       - link  | type: string  | call to be sent to a url.
|       - token | type: string  | null = not auth else token key.
|       - authorization | type: string | default = "basic"
|       - stateLoading  | type: boolean| default = true
|       
| let value = useState((state) => state.api[link])
*/
export const putDataSimple = (
  data,
  link,
  token,
  authorization = "basic",
  stateLoading = true
) => (dispatch) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }
  let request = {
    method: "PUT",
    url: `/${link}/`,
    headers: token
      ? {
          Authorization: authorization + " " + token,
        }
      : {},
    data: data,
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: GET,
        payload: {
          name: link,
          response,
        },
      });
      dispatch(isLoading(false));
      return response;
    })
    .catch((err) => {
      if (err.response.statusText === "Unauthorized") {
        dispatch({ type: LOGOUT });
      } else {
        dispatch(returnMsg(err));
        dispatch(isLoading(false));
      }
    });
};

/*
|--------------------------------------------------------------------------
| searchData - Sends get request with search params and returns with an
| error or request.
|--------------------------------------------------------------------------
|  
| Params:
|       - params| type: string  | params to be passed in url
|       - link  | type: string  | call to be sent to a url.
|       - token | type: string  | null = not auth else token key.
|       - authorization | type: string | default = "basic"
|       - stateLoading  | type: boolean| default = true
|       
| let value = useState((state) => state.api[link])
*/
export const searchData = (
  params,
  link,
  token,
  authorization = "basic",
  stateLoading = true
) => (dispatch) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }

  let request = {
    method: "GET",
    url: `/${link}?search=${params}`,
    headers: token
      ? {
          Authorization: authorization + " " + token,
        }
      : {},
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: GET,
        payload: {
          name: link,
          response,
        },
      });
      dispatch(isLoading(false));
      return response;
    })
    .catch((err) => {
      if (err.response.statusText === "Unauthorized") {
        dispatch({ type: LOGOUT });
      } else {
        dispatch(returnMsg(err));
        dispatch(isLoading(false));
      }
    });
};

/*
|--------------------------------------------------------------------------
| deleteData - Sends delete request with params and returns with an
| error or request.
|--------------------------------------------------------------------------
|  
| Params:
|       - params| type: string  | params to be passed in url
|       - link  | type: string  | call to be sent to a url.
|       - token | type: string  | null = not auth else token key.
|       - authorization | type: string | default = "basic"
|       - stateLoading  | type: boolean| default = true
|       
| let value = useState((state) => state.api[link])
*/
export const deleteData = (
  params,
  link,
  token,
  authorization = "basic",
  stateLoading = true
) => (dispatch) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }

  let request = {
    method: "DELETE",
    url: `/${link}/${params}/`,
    headers: token
      ? {
          Authorization: authorization + " " + token,
        }
      : {},
  };

  return axios(request)
    .then((response) => {
      dispatch({
        type: DELETE,
        payload: {
          name: link,
          response,
        },
      });
      dispatch(isLoading(false));
      return response;
    })
    .catch((err) => {
      if (err.response.statusText === "Unauthorized") {
        dispatch({ type: LOGOUT });
      } else {
        dispatch(returnMsg(err));
        dispatch(isLoading(false));
      }
    });
};
