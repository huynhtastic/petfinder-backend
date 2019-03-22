import { fetchV2ForJson, endpoints } from '../helpers';

export async function get(req, res, next) {
  try {
    res.status(200).send();
    //    let url = buildPetUrl(req.params, petMethods.RANDOM);
    //    fetch(url)
    //      .then((petRes) => {
    //        if (petRes.status === 200) {
    //          return petRes.json();
    //          res.status(200).send();
    //        } else {
    //          res.status(404).end();
    //        }
    //      })
    //      .then((json) => {
    //        if (json) {
    //          let petfinder = json.petfinder;
    //          console.log(json.petfinder);
    //          if (petfinder.header.status.code.$t == 100) {
    //            let res_json = {id: petfinder.petIds.id.$t};
    //            res.status(200).json(res_json);
    //          } else {
    //            res.status(404).end();
    //          }
    //        }
    //      });
  } catch (err) {
    next(err);
  }
}

/**
 * Convert the JSON from the getTypes petV2 call from an array of animal
 * objects to an object of animal objects.
 *
 * @param req {object} - Request made from a client for available animals.
 * @param res {object} - Response to send back to the client
 */
export async function getTypes(req, res, next) {
  try {
    const json = await fetchV2ForJson(endpoints.ALLTYPES);
    const validParams = {
      name: [{
        placeholder: 'Enter a name to search for.',
        allowClear: true,
      }, 'text'],
      location: [{
        placeholder: '[Zip code] or [City, State]',
        allowClear: true,
      }, 'text'],
      type: [[], 'select'],
      breed: [[], 'select'],
      gender: [[], 'select'],
      coat: [[], 'select'],
      color: [[], 'select'],
      size: [['Small', 'Medium', 'Large', 'XL'], 'select'],
      age: [['Baby', 'Young', 'Adult', 'Senior'], 'select'],
      status: [['Adoptable', 'Adopted', 'Found'], 'select'],
    };

    let populatedTypes = {};
    for (let animalObj of json.types) {
      let convAnimalObj = {};
      for (let [animalProp, animalValue] of Object.entries(animalObj)) {
        if (animalObj.hasOwnProperty(animalProp) && animalProp !== 'name') {
          // Name is plural; need to be singular
          const singularProp = animalProp.substring(0, animalProp.length-1);
          convAnimalObj[singularProp] = animalValue;
        }
      }
      populatedTypes[animalObj['name']] = convAnimalObj;
    }

    res.status(200).json({
      types: populatedTypes,
      validParams: validParams
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Returns an object filled with breeds of a certain animal type.
 *
 * @param {object} req - Request with "type" defined in the query URL.
 * @param {object} res - Response to build with breed JSON stored.
 */
export async function getBreeds(req, res, next) {
  try {
    const type = req.query.type;
    if (type !== undefined) {
      const endpoint = endpoints.BREEDS`${type}`;
      const json = await fetchV2ForJson(endpoint);
      const status = json.status;
      if (status === undefined) {
        res.status(200).json(json);
      } else {
        res.status(status).end();
      }
    } else {
      // Type parameter is required
      // TODO: change 404 to informational error saying type is required
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
