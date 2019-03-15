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
      size: [['Small', 'Medium', 'Large', 'XL'], 'select'],
      gender: [[], 'select'],
      age: [['Baby', 'Young', 'Adult', 'Senior'], 'select'],
      coat: [[], 'select'],
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
