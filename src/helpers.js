import buildUrl from 'build-url';
import fetch from 'node-fetch';
import env from './env';

const petUrl = 'http://api.petfinder.com';
const petV2 = 'https://api.petfinder.com/v2';
export const endpoints = {
  ALLTYPES: 'types',
  ANIMALS: 'animals',
  BREEDS: breedTag,
}

var token = {};

function breedTag(strings, typeExp) {
  return `types/${typeExp}/breeds`;
}

/**
 * Request a new authorization token from petV2 for api calls and put the token
 * into a global token variable to keep state.
 */
async function __requestToken() {
  // Build everything needed to request a new token
  const path = 'oauth2/token';
  const url = buildUrl(petV2, { path: path });
  const body = {
    grant_type: 'client_credentials',
    client_id: env.clientId,
    client_secret: env.clientSecret,
  };

  // Create a request for a new token
  console.log(url);
  try {
    const tokenRes = await fetch(url, {
      method: 'POST',
      body:   JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    var tokenJson = await tokenRes.json();
  } catch (err) {
    console.log(err);
  };

  // Create a new expiration time for us to compare by adding response expire
  // time to our current time
  const currentTime = Math.floor((new Date).getTime() / 1000);
  console.log('tokenJson', tokenJson);
  tokenJson['expires_in'] += currentTime;
  token = tokenJson;
}

/**
 * Checks if the system needs to request a new auth token from petv2 and returns
 * the value of the Authorization header used when making an api call to petV2.
 *
 * @returns {string} - Value for authorization header for api calls to petV2.
 */
export async function getTokenHeader() {
  // check if token is empty
  if (Object.entries(token).length === 0 && token.constructor === Object) {
    // token is empty; request a new one
    await __requestToken();
  } else if (token['expires_in'] < Math.floor((new Date).getTime() / 1000)) {
    // token expired; request a new one
    await __requestToken();
  }
  return `${token['token_type']} ${token['access_token']}`;
}

/**
 * Fetches petfinderV2 for some JSON response.
 *
 * @param {string} endpoint - Endpoint path to hit as defined in endpoints
 *    variable.
 * @param {object} params - Defines url parameters for a GET request.
 * @param {function} next - The method to call when an error occurs.
 *
 * @returns {object} json - Representation of JSON returned from petV2 api call.
 */
export async function fetchV2ForJson(endpoint, params={}, next=console.log) {
  try {
    // Fetch token and build url to make api call to petV2
    const tokenHeader = await getTokenHeader();
    const url = buildUrl(petV2, {
      path: endpoint,
      queryParams: params,
    });

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': tokenHeader },
    });
    const json = await res.json();
    return json;
  } catch (err) {
    next(err);
  }
}
