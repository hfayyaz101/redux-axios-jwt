export let URL = "http://localhost:3000";
export let AuthKey = "Basic";

export default function SetURL(newURL, authorizationKey) {
  URL = newURL;
  AuthKey = authorizationKey;
  return { URL, AuthKey };
}
