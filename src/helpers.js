import buildUrl from 'build-url';
import fetch from 'node-fetch';
import env from './env';

const petUrl = 'http://api.petfinder.com';
const petv2 = 'https://api.petfinder.com/v2';
export const petMethods = {
    GET: 'pet.get',
    RANDOM: 'pet.getRandom',
    FIND: 'pet.find',
  }

var token = {};


async function __requestToken() {
  // Build everything needed to request a new token
  const path = 'oauth2/token';
  const url = buildUrl(petv2, { path: path });
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

export function getToken() {
  // check if token is empty
  if (Object.entries(token).length === 0 && token.constructor === Object) {
    // token is empty; request a new one
    __requestToken();
  } else if (token['expires_in'] < Math.floor((new Date).getTime() / 1000)) {
    // token expired; request a new one
    __requestToken();
  }
  return token['access_token'];
}

export function buildPetUrl(params, petMethod) {
  // build query params by including apikey and requesting json
  params.key = env.petKey;
  params.format = 'json';

  getToken()
  console.log('buildpeturl params', params);
  let url = buildUrl(petUrl, {
    path: petMethod,
    queryParams: params,
  });
  console.log('buildpeturl url', url);
  return url;
}
