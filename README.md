# redux-axios-jwt

Kind of like a boilerplate. Plug and play, use with DJango, DRF Rest APIs.

### Setting up

Installing package using NPM.

    npm install redux-axios-jwt

Once installed, you know need to link package with your application.

> **Note:** Before setting up make sure you have redux setup already.

#### Defining URL & AuthKey (Example)

Default URL value is `https://localhost:3000`

Open main parent `index.js` file and add following lines of code.

```js
...
import setURL form 'redux-axios-jwt'

let URL = 'http://localhost:8000/api' // server url for the apis
let AuthKey = "Basic" // Key value for Authorization in Headers.
setURL(URL, AuthKey)
...
```

##### API `setURL()`

| Name    | Type   | Default                   | Description                                          |
| ------- | ------ | ------------------------- | ---------------------------------------------------- |
| URL     | string | `"http://localhost:3000"` | Server URL, call to be made to.                      |
| AuthKey | string | `"Basic"`                 | Key value required for JWT Authorization in headers' |

## API Actions / Reducers

To use apiAction, you first need to link its reducers with the store.
Open **_reducers index.js_** file and add in following lines.

```js
...
import apiReducers from  "redux-axios-jwt/reducers/apiReducers";

export default combineReducers({
    ...
    api: apiReducers,
    ...
});
...
```

### Actions List

| Name                | Params                                              | Type                                                | Params Defaults                          | Description                                                                                                                                                                                                                                                                                                                                            | State|                                                                 
| ------------------- | --------------------------------------------------- | --------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **`isLoading`**     | status                                              | Boolean                                             | false                                    | This action runs by default (if stateLoading = true), enabling to be run at parent component level. <br /> This is linked with each action that makes an Axios call, hence follows following rules.<br /> <ul><li>Before axios call => true</li><li>Once returns a callback => false</li></ul>`let loading = useState((state) => state.api.isLoading)` | api.isLoading                                                         | 
| **`returnMsg`**     | message                                             | string                                              | `""`                                     | This action runs by default, enabling to be run at parent component level.<br/>This is linked with each action that makes an Axios call, hence follows following rules.<ul><li>Once returns a callback => msg from .then response.status_code</li><li>.catch error.response.status</li></ul>`let msg = useState((state) => state.api.message)`         | api.message                                                            
| **`isUniversal`**   | data                                                | object                                              | `{}`                                     | Get data inform of an object<br/>Can be accessed from anywhere.<br/>`let universal = useState((state) => state.api.universal)`                                                                                                                                                                                                                         | api.universal                                                          
| **`changeValue`**   | name<br/>value                                      | string<br/>object                                   |                                          | Stores any value against a key. Can be used in forms as handleChange. Can be accessed from anywhere.<br/>`let value = useState((state) => state.api.value)`                                                                                                                                                                                            | api.value                                                              
| **`resetValue`**    |                                                     |                                                     |                                          | Reset value of redux to default. Can be used once you are done using value param, for e.g. after completing form and submitting it to the post request. Its not called automatically by any other action.                                                                                                                                              |                                                                        |
| **`postData`**      | data<br/>link<br/>token<br/>stateLoading            | object<br/>string<br/>string<br/>boolean            | <br/><br/><br/>true                      | Sends post request and returns with an error or request. <br/>`et value = useState((state) => state.api[link])`                                                                                                                                                                                                                                        | api[link]                                                              
| **`getData`**       | params<br/>link<br/>token<br/>stateLoading          | string<br/>string<br/>string<br/>boolean            | <br/><br/><br/>true                      | Sends get request and returns with an error or request.                                                                                                                                                                                                                                                                                                | api["GET-" + link]                                                     
| **`getListData`**   | link<br/>token<br/>stateLoading                     | string<br/>string<br/>boolean                       | <br/><br/>true                           | Sends get request and returns with an error or request.                                                                                                                                                                                                                                                                                                | api[link]                                                              
| **`putDataParams`** | data<br/>link<br/>params<br/>token<br/>stateLoading | object<br/>string<br/>string<br/>string<br/>boolean | <br/><br/><br/><br/>true                 | Sends put request with data and returns with an error or request.                                                                                                                                                                                                                                                                                      |
| **`putDataSimple`** | data<br/>link<br/>token<br/>stateLoading            | object<br/>string<br/>string<br/>boolean            | <br/><br/><br/>true                      | Sends put request with data and returns with an error or request.                                                                                                                                                                                                                                                                                      | api[link]                                                              
| **`searchData`**    | params<br/>link<br/>token<br/>stateLoading          | string<br/>string<br/>string<br/>boolean            | <br/><br/><br/>true                      | Sends get request with search params and returns with an error or request.                                                                                                                                                                                                                                                                             | api[link]                                                              
| **`deleteData`**    | params<br/>link<br/>token<br/>stateLoading          | string<br/>string<br/>string<br/>boolean            | string<br/>string<br/>string<br/>boolean | <br/><br/><br/>true                                                                                                                                                                                                                                                                                                                                    | Sends delete request with params and returns with an error or request. | api[link] 


## API Actions / Reducers

To use userActions, you first need to link its reducers with the store.
Open **_reducers index.js_** file and add in following lines.

```js
...
import userReducers from  "redux-axios-jwt/reducers/userReducers";

export default combineReducers({
    ...
    user: userReducers,
    ...
});
...
```
### Actions List

| Name                | Params                                              | Type                                                | Params Defaults                          | Description                                                                                                                                                                                                                                                                                                                                            | State|                                                                 
| ------------------- | --------------------------------------------------- | --------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **`isLoading`**     | status                                              | Boolean                                             | false                                    | This action runs by default (if stateLoading = true), enabling to be run at parent component level. <br /> This is linked with each action that makes an Axios call, hence follows following rules.<br /> <ul><li>Before axios call => true</li><li>Once returns a callback => false</li></ul>`let loading = useState((state) => state.user.isLoading)` | user.isLoading                                                         | 
| **`returnMsg`**     | message                                             | string                                              | `""`                                     | This action runs by default, enabling to be run at parent component level.<br/>This is linked with each action that makes an Axios call, hence follows following rules.<ul><li>Once returns a callback => msg from .then response.status_code</li><li>.catch error.response.status</li></ul>`let msg = useState((state) => state.user.message)`         | user.message                                                            
| **`changeValue`**   | name<br/>value                                      | string<br/>object                                   |                                          | Stores any value against a key. Can be used in forms as handleChange. Can be accessed from anywhere.<br/>`let value = useState((state) => state.user.value)`                                                                                                                                                                                            | user.value                                                 
|**`firstTimeLoad`**||||Insert at the time when app renders for the first time. <br/> User auth credentials gets loaded on first time load, hence automatically logins.|
|**`loginUser`**|userName<br/>password<br/>userDetailsLink|string<br/>string<br/>string|<br/><br/>"accounts/getuser/"|Login user using username and password.<br/>On success gets token and refresh token which than gets stored in localstorage. <br/>Send an api call to get userdetails too. Gets stored in user_data.|user.id_token<br/>user.user_data

### Contributar
[Hamza Fayyaz](https://github.com/hfayyaz101)
