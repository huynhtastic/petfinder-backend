import sqlite3 from 'sqlite3';
import { fetchV2ForJson, endpoints } from '../helpers';

export async function getFavorites(req, res, next) {
  let allRows = [];
  let db = new sqlite3.Database('./db/petfinder.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('connected to db');
  });

  let sql = `SELECT * FROM Favorites`;
  await db.all(sql, [], (err, rows) => {
    if (err) { throw err;}
    allRows = rows.map(obj => obj.id);
  });

  db.close(async (err) => {
    if (err) {
      return console.error(err.message);
      // TODO: change to correct code
      res.status(404).send();
    }
    console.log('closed connected to db');

    let favorites = [];
    for (let petid of allRows) {
      const endpoint = endpoints.ANIMAL`${petid}`;
      const json = await fetchV2ForJson(endpoint);
      const status = json.status;
      if (status === undefined) {
        favorites.push(json.animal);
      }
    }
    res.status(200).json({ animals: favorites });
    // TODO: merge this mapping with allrows mapping
  });
}
