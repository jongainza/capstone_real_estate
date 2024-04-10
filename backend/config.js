require("dotenv").config();

const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgressql:///real_estate_db_test"
    : "postgresql:///real_estate_db";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const default_photo_url =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXHJLVTn98FZ-mf3ETMUWhP8Q5qKetQX5GnOBK55Xl8iftBIHPGxT5rxeMlg&s";

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
