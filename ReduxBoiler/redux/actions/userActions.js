import axios from "axios";

import {
  USER_LOADING,
  USER_RETURN_MSG,
  USER_CHANGE_VALUE,
  LOGIN,
  // SOCIAL_FB_LOGIN,
  // SIGNUP,
  LOGOUT,
} from "./userActionTypes";

// const url = "http://ec2-3-227-185-129.compute-1.amazonaws.com:8000/api";
const url = "https://administration.easyinsurance.com.pk/api";
// const url = "http://localhost:8000/api";
// Loading
export const isLoading = (status) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
    payload: status,
  });
};

// Messages
export const returnMsg = (msg) => (dispatch) => {
  dispatch({
    type: USER_RETURN_MSG,
    payload: msg,
  });
};

// Dynamicly Adds new values and column into the Table
export const changeValue = (name, value) => (dispatch) => {
  dispatch({
    type: USER_CHANGE_VALUE,
    payload: {
      name,
      value,
    },
  });
};

// Local Storage => have to change into session storage
export const firstTimeLoad = () => (dispatch) => {
  if (sessionStorage.getItem("user_data")) {
    let user_data = sessionStorage.getItem("user_data");
    dispatch({
      type: LOGIN,
      payload: JSON.parse(user_data),
    });
  }
};

// LoginUser
export const loginUser = (userName, password) => (dispatch) => {
  dispatch(isLoading(true));

  var data = new FormData();
  data.append("username", userName);
  data.append("password", password);

  let request = {
    method: "POST",
    url: `${url}/token/`,
    body: data,
    mimeType: "multipart/form-data",
    data,
  };

  return axios(request)
    .catch((err) => {
      dispatch(returnMsg(err));
      return true;
    })
    .then((response) => {
      if (response && response.status === 200) {
        let request2 = {
          method: "GET",
          url: `${url}/account/details/`,
          headers: {
            Authorization: "ei " + response.data.access,
          },
        };
        return axios(request2).then((res) => {
          dispatch({
            type: LOGIN,
            payload: {
              userData: res.data,
              id_token: response.data.access,
            },
          });
          dispatch(isLoading(false));
          return response.data.access;
        });
      } else {
        dispatch(returnMsg("Email or Password is incorrect."));
        dispatch(isLoading(false));
      }
    });
};

export const portfolioUpdateUser = (JWT, user_data) => (dispatch) => {
  dispatch(isLoading(true));

  let request2 = {
    method: "GET",
    url: `${url}/accounts/details/`,
    headers: {
      Authorization: "Bearer " + JWT,
    },
  };

  return axios(request2)
    .then((res) => {
      user_data = Object.assign(user_data, res.data[0]);
      dispatch({
        type: LOGIN,
        payload: {
          userData: user_data,
          id_token: JWT,
        },
      });
      dispatch(isLoading(false));
      return true;
    })
    .catch((err) => {
      dispatch(isLoading(false));
    });
};

// SignUp User
export const signUp = (formData) => (dispatch) => {
  dispatch(isLoading(true));
  dispatch(returnMsg(""));

  var data = new FormData();
  data.append("email", formData.email);
  data.append("first_name", formData.first_name);
  data.append("last_name", formData.last_name);
  data.append("password", formData.password);
  data.append("password2", formData.password2);
  data.append("contactNumber", formData.contactNumber);

  let request = {
    method: "POST",
    url: `${url}/account/create/`,
    body: data,
    mimeType: "multipart/form-data",
    data,
  };

  return axios(request)
    .then((response) => {
      dispatch(isLoading(false));
      dispatch(loginUser(formData.email, formData.password));
      return response.data;
    })
    .catch((err) => {
      dispatch(returnMsg(err));
      dispatch(isLoading(false));
      return err;
    });
};

export const signUpSocial = (formData) => (dispatch) => {
  dispatch(isLoading(true));

  var data = new FormData();
  data.append("username", formData.username);
  data.append("email", formData.email);
  data.append("name", formData.name);
  data.append("password", formData.password);

  let request = {
    method: "POST",
    url: `${url}/accounts/auth/social/signup/`,
    body: data,
    mimeType: "multipart/form-data",
    data,
  };

  return axios(request)
    .then((response) => {
      dispatch(isLoading(false));
      // dispatch(
      //   loginUser(formData.username, formData.password + "455627075292")
      // );
      return true;
    })
    .catch((err) => {
      dispatch(returnMsg(err));
      dispatch(isLoading(false));
    });
};

// LogOut
export const logOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
