import sqlite3 from 'sqlite3';

function initializeDB() {
  let db = new sqlite3.Database('./db/petfinder.db', function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('connected to db');
  });
  return db;
}

function closeDB(db) {
  db.close(function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('closed connected to db');
  });
}

export async function changeDB(req, res, next) {
  //let db = initializeDB();
  let db = new sqlite3.Database('./db/petfinder.db', function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('connected to db');
  });

  let sql = `SELECT * FROM Favorites`;
  db.all(sql, [], (err, rows) => {
    if (err) { throw err;}
    const allRows = rows.map(obj => obj.id);
    const petid = req.body.petid;
    if (allRows.includes(petid)) {
      db.run(`DELETE FROM Favorites WHERE id=?`, petid, (err) => {
        if (err) { return console.error(err.message); }
        console.log(`Row(s) deleted ${petid}`);
      });
    } else {
      db.run(`INSERT INTO Favorites VALUES(?)`, [petid], (err) => {
        if (err) { return console.log(err.message); }
        console.log(`A row has been inserted with rowid ${petid}`);
      });
    }
  });

  db.close(function(err) {
    if (err) {
      return console.error(err.message);
      // TODO: change to correct code
      res.status(404).send();
    }
    console.log('closed connected to db');
    res.status(200).send();
  });
}

export async function insertIntoDB(req, res, next) {
  let db = initializeDB();
  console.log(req.body);
  db.run(`INSERT INTO Favorites VALUES(?)`, values, (err) => {
    if (err) { return console.log(err.message); }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  closeDB(db);
}

export function deleteFromDB(values) {
  let db = initializeDB();
  closeDB(db);
}
