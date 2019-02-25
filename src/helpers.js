import buildUrl from 'build-url';
import env from './env';

const petUrl = 'http://api.petfinder.com';
export const petMethods = {
    GET: 'pet.get',
    RANDOM: 'pet.getRandom',
    FIND: 'pet.find',
  }

export function buildPetUrl(params, petMethod) {
  // build query params by including apikey and requesting json
  params.key = env.petKey;
  params.format = 'json';

  console.log(params);
  return buildUrl(petUrl, {
    path: petMethod,
    queryParams: params,
  });
}
