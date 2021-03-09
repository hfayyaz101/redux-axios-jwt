import axios from "axios";
import {
  API_LOADING,
  API_RETURN_MSG,
  API_CHANGE_VALUE,
  API_RESET_VALUE,
  POST,
  LIST,
  GET,
  SCAN,
  UNIVERSAL,
  COLOR_MODE,
  USER_APPEND_VALUE,
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
    url: url + "/" + link + "/",
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

// GET DATA (/link/params)
export const getData = (
  params,
  link,
  token,
  stateLoading = true,
  authorization = "basic "
) => (dispatch) => {
  stateLoading && dispatch(isLoading(true));

  var request = {};
  if (token) {
    request = {
      method: "GET",
      url: `/${link}/${params}/`,
      headers: {
        Authorization: authorization + " " + token,
      },
    };
  } else {
    request = {
      method: "GET",
      url: `/${link}/${params}/`,
    };
  }

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

// POSt Data

// CREATE / UPDATE Data
export const editUpdateData = (
  data,
  table_name,
  id,
  token,
  stateLoading = true
) => (dispatch) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }

  var request = {};
  if (token) {
    request = {
      url: url + "/" + table_name + "/" + id + "/",
      method: "PUT",
      headers: {
        Authorization: authorization + " " + token,
      },
      data: data,
    };
  } else {
    request = {
      url: url + "/" + table_name + "/" + id + "/",
      method: "PUT",
      data: data,
    };
  }

  return axios(request)
    .then((response) => {
      dispatch({
        type: CREATE_UPDATE,
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

// List Data (url/table_name)
export const listData = (table_name, token, stateLoading = true) => (
  dispatch
) => {
  if (stateLoading === true) {
    dispatch(isLoading(true));
  }

  var request = {};
  if (token) {
    request = {
      method: "GET",
      url: url + "/" + table_name + "/",
      headers: {
        Authorization: authorization + " " + token,
      },
    };
  } else {
    request = {
      method: "GET",
      url: url + "/" + table_name + "/",
    };
  }
  //Parent Child relation...Parent  passes feature(response) to its child that "since i am dying" hey yo my sweet child you use it for your life now....

  return axios(request)
    .then((response) => {
      dispatch({
        type: LIST,
        payload: {
          name: table_name,
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

// LIST SCAN DATA (url/link/params)
export const scanData = (params, link, token, stateLoading = true) => (
  dispatch
) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }
  var request = {};
  if (token) {
    request = {
      method: "GET",
      url: `/${link}/${params}/`,
      headers: {
        Authorization: authorization + " " + token,
      },
    };
  } else {
    request = {
      method: "GET",
      url: `/${link}/${params}/`,
    };
  }

  return axios(request)
    .then((response) => {
      dispatch({
        type: SCAN,
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

// Change Status PUT
export const putData = (data, tablename, token, stateLoading = true) => (
  dispatch
) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }
  var request = {};
  if (token) {
    request = {
      method: "PUT",
      url: `/${tablename}/`,
      headers: {
        Authorization: authorization + " " + token,
      },
      data: data,
    };
  } else {
    request = {
      method: "PUT",
      url: `/${tablename}/`,
      data: data,
    };
  }

  return axios(request)
    .then((response) => {
      dispatch({
        type: SCAN,
        payload: {
          name: tablename,
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

// SEARCH DATA (url/link/params)
export const searchData = (params, link, token, stateLoading = true) => (
  dispatch
) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }

  var request = {};
  if (token) {
    request = {
      method: "GET",
      url: `/${link}?search=${params}`,
      headers: {
        Authorization: authorization + " " + token,
      },
    };
  } else {
    request = {
      method: "GET",
      url: `/${link}?search=${params}`,
    };
  }

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

// SEARCH DATA (url/link/params)
export const searchData2 = (params, link, token, stateLoading = true) => (
  dispatch
) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }

  var request = {};
  if (token) {
    request = {
      method: "GET",
      url: `/${link}?search=${params}`,
      headers: {
        Authorization: authorization + " " + token,
      },
    };
  } else {
    request = {
      method: "GET",
      url: `/${link}?search=${params}`,
    };
  }

  return axios(request)
    .then((response) => {
      dispatch({
        type: GET,
        payload: {
          name: link + "2",
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

// Delete
export const deleteData = (params, link, token, stateLoading = true) => (
  dispatch
) => {
  if (stateLoading) {
    dispatch(isLoading(true));
  }
  var request = {};
  if (token) {
    request = {
      method: "DELETE",
      url: `/${link}/${params}/`,
      headers: {
        Authorization: authorization + " " + token,
      },
    };
  } else {
    request = {
      method: "DELETE",
      url: `/${link}/${params}/`,
    };
  }

  return axios(request)
    .then((response) => {
      dispatch({
        type: SCAN,
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

// Color mode
export const colorMode = (data) => (dispatch) => {
  dispatch({
    type: COLOR_MODE,
    payload: {
      color: data,
    },
  });
};

export const appendValue = (value) => (dispatch) => {
  dispatch({
    type: USER_APPEND_VALUE,
    payload: {
      value,
    },
  });
};

// Local Storage => have to change into session storage
export const firstTimeLoadApis = () => (dispatch) => {
  if (localStorage.getItem("colorMode")) {
    let color_mode = localStorage.getItem("colorMode");
    // let email = JSON.parse(user_data).userData.email;
    // let request0 = {
    //   method: "POST",
    //   data: {
    //     email: email
    //   },
    //   url: url + "/accounts/email/check/"
    // };

    // axios(request0).then(res => {
    //   if (!res.data.status) {
    //     dispatch({
    //       type: LOGOUT
    //     });
    //   } else {
    dispatch({
      type: COLOR_MODE,
      payload: { color: color_mode },
    });
    //   }
    // });
  }
  if (
    localStorage.getItem("log_array") &&
    localStorage.getItem("log_array") !== "undefined" &&
    Array.isArray(JSON.parse(localStorage.getItem("log_array")))
  ) {
    if (JSON.parse(localStorage.getItem("log_array")).length !== 0) {
      let value = JSON.parse(localStorage.getItem("log_array"));
      dispatch({
        type: USER_APPEND_VALUE,
        payload: {
          value,
        },
      });
    }
  }
};
