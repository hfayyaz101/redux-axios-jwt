import axios from "axios";
import {
  USER_LOADING,
  USER_RETURN_MSG,
  USER_CHANGE_VALUE,
  LOGIN,
  LOGOUT,
} from "./userActionTypes";

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
    type: USER_LOADING,
    payload: status,
  });
};

/*
|--------------------------------------------------------------------------
| returnMSG - Global msg for notification in return of a response.
|--------------------------------------------------------------------------
|
| Params:
|       - msg | type: string | default: ""
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
export const returnMsg = (msg) => (dispatch) => {
  dispatch({
    type: USER_RETURN_MSG,
    payload: msg,
  });
};

/*
|--------------------------------------------------------------------------
| changeValue - Dynamicly Adds new values and column into the Table
|--------------------------------------------------------------------------
|  
| Params:
|       - name  | type: string   | key value of the data
|       - value | type: anything | value against the key.
|
| Stores any value against a key. Can be used in forms as handleChange.
|
| Can be accessed from anywhere.
| let value = useState((state) => state.api.value)
*/
export const changeValue = (name, value) => (dispatch) => {
  dispatch({
    type: USER_CHANGE_VALUE,
    payload: {
      name,
      value,
    },
  });
};

/*
|--------------------------------------------------------------------------
| firstTimeLoad - At the time when app renders for the first time.
|--------------------------------------------------------------------------  
|
| User Auth credentials gets loaded on firts time load, hence login auto
|
*/
export const firstTimeLoad = () => (dispatch) => {
  if (localStorage.getItem("user_data")) {
    let user_data = localStorage.getItem("user_data");
    dispatch({
      type: LOGIN,
      payload: JSON.parse(user_data),
    });
  }
};

/*
|--------------------------------------------------------------------------
| loginUser - Login user using username and password.
|--------------------------------------------------------------------------
|  
| Params:
|       - userName  | type: string   
|       - password  | type: string   
|       - userDetailsLink  | type: string | Default = /account/getuser/
|       - authorization    | type: string | Default = basic
|
| On success gets token and refresh token which than gets stored in
| localstorage.
|  
| Send an api call to get userdetails too. Gets stored in user_data
|
| Can be accessed from anywhere.
| let value = useState((state) => state.user.id_token)
*/
export const loginUser = (
  userName,
  password,
  userDetailsLink = "/account/getuser/",
  authorization = "basic"
) => (dispatch) => {
  dispatch(isLoading(true));

  var data = new FormData();
  data.append("username", userName);
  data.append("password", password);

  let request = {
    method: "POST",
    url: `/token/`,
    body: data,
    mimeType: "multipart/form-data",
    data,
  };

  return axios(request)
    .catch((err) => {
      dispatch(returnMsg("Email or Password is incorrect."));
    })
    .then((response) => {
      if (response && response.status === 200) {
        let request2 = {
          method: "GET",
          url: userDetailsLink,
          headers: {
            Authorization: authorization + " " + response.data.access,
          },
        };
        var user_data = {};
        return axios(request2)
          .then((res) => {
            user_data = Object.assign(user_data, res.data);
            dispatch({
              type: LOGIN,
              payload: {
                userData: user_data,
                id_token: response.data.access,
              },
            });

            dispatch(isLoading(false));
            return true;
          })
          .catch((err) => {
            dispatch(returnMsg("Email or Password is incorrect."));
            dispatch(isLoading(false));
          });
      } else {
        dispatch(returnMsg("Email or Password is incorrect."));
        dispatch(isLoading(false));
      }
    });
};

/*
|--------------------------------------------------------------------------
| logOutUser - User logout.
|--------------------------------------------------------------------------
*/
export const logOut = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
