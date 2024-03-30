const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgressql:///real_estate_db_test";
} else {
  DB_URI = "postgresql:///real_estate_db";
}

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
