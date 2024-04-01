const { Client } = require("pg");
const { DB_URI } = require("./config");

let db = new Client({
  connectionString: DB_URI,
});

db.connect()
  .then(() => {
    console.log("Connected to Postgress");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
