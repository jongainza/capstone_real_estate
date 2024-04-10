const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const ExpressError = require("../expressError");

/** User of the site. */

class User {
  /** register new user -- returns
   *    {username,email, hashedpassword}
   */

  static async register(username, email, password, photo) {
    try {
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      console.log(hashedPassword);
      console.log(username);
      const phot = photo
        ? photo
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXHJLVTn98FZ-mf3ETMUWhP8Q5qKetQX5GnOBK55Xl8iftBIHPGxT5rxeMlg&s";
      const response = await db.query(
        `INSERT INTO users (username, email, password,registration_date, photo  )
      VALUES ($1,$2,$3,current_timestamp,$4)
      RETURNING username,email, password,registration_date,photo`,
        [username, email, hashedPassword, phot]
      );
      const user = response.rows[0];
      const responseData = {
        success: true,
        message: "You are registered",
        username: user.username,
        email: user.email,
        registration_date: user.registration_date, // Include the registration date in the response
        photo: phot,
      };
      return responseData;
    } catch (err) {
      // Handle any errors that occur during password hashing or database operation
      throw new Error(`Error registering user: ${err.message}`);
    }
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const results = await db.query(
      `SELECT username,password FROM users WHERE username=$1`,
      [username]
    );
    const user = results.rows[0];
    if (user) {
      const response = await bcrypt.compare(password, user.password);
      return user && response;
    }
    throw new ExpressError("User not found");
  }

  /** Update last_login_at for user */

  static async updateRegisterTimestamp(username) {
    const results = await db.query(
      `UPDATE users SET last_login_at=current_timestamp WHERE username=$1 RETURNING username`,
      [username]
    );
    if (!results.rows[0]) {
      throw new ExpressError(`${username} is not registerded`, 404);
    }
  }

  static async findUser(email) {
    const results = await db.query(
      "SELECT username, password, registration_date, photo FROM users WHERE email = $1",
      [email]
    );
    if (results.rows.length === 0) {
      // No user found for the given email
      return null; // Or you can return an empty object, depending on your use case
    }

    const user = results.rows[0];
    const responseData = {
      success: true,
      message: "welcome",
      username: user.username,
      email: email,
      registration_date: user.registration_date, // Include the registration date in the response
      photo: user.photo,
    };
    return responseData;
  }
}
module.exports = User;
