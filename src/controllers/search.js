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

export async function getTypes(req, res, next) {
  try {
    const json = await fetchV2ForJson(endpoints.ALLTYPES)
    res.status(200).json(json);
  } catch (err) {
    next(err);
  }
}
