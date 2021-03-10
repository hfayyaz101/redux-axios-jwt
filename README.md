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

| Name        | Params  | Type    | Params Defaults | Description                                                                                                                                                                                                                                                                                                                                            | State         |
| ----------- | ------- | ------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| isLoading   | status  | Boolean | false           | This action runs by default (if stateLoading = true), enabling to be run at parent component level. <br /> This is linked with each action that makes an Axios call, hence follows following rules.<br /> <ul><li>Before axios call => true</li><li>Once returns a callback => false</li></ul>`let loading = useState((state) => state.api.isLoading)` | api.isLoading |
| returnMsg   | message | string  | `""`            | This action runs by default, enabling to be run at parent component level.<br/>This is linked with each action that makes an Axios call, hence follows following rules.<ul><li>Once returns a callback => msg from .then response.status_code</li><li>.catch error.response.status</li>`let msg = useState((state) => state.api.message)`              | api.message   |
| isUniversal | data    | object  | `{}`            | Get data inform of an object<br/>Can be accessed from anywhere.<br/>`let universal = useState((state) => state.api.universal)`                                                                                                                                                                                                                         | api.universal |
