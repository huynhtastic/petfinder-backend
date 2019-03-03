import fetch from 'node-fetch';
import { buildPetUrl, petMethods} from '../helpers';
import env from '../env';

export async function get(req, res, next) {
  try {
    let url = buildPetUrl(req.params, petMethods.RANDOM);
    fetch(url)
      .then((petRes) => {
        if (petRes.status === 200) {
          return petRes.json();
          res.status(200).send();
        } else {
          res.status(404).end();
        }
      })
      .then((json) => {
        if (json) {
          let petfinder = json.petfinder;
          console.log(json.petfinder);
          if (petfinder.header.status.code.$t == 100) {
            let res_json = {id: petfinder.petIds.id.$t};
            res.status(200).json(res_json);
          } else {
            res.status(404).end();
          }
        }
      });
  } catch (err) {
    next(err);
  }
}

export async function getFindParams(req, res, next) {
  try {
    let params = {
      animal: ['barnyard', 'bird', 'cat', 'dog', 'horse', 'reptile', 'smallfurry'],
      size: {
        Small: 'S',
        Medium: 'M',
        Large: 'L',
        'Extra-large': 'XL',
      },
      sex: {
        Male: 'M',
        Female: 'F',
      },
      age: ['Baby', 'Young', 'Adult', 'Senior'],
    };
    res.status(200).json(params);
  } catch (err) {
    next(err);
  }
}
