const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const ExpressError = require("../expressError");

/** User of the site. */

class User {
  /** register new user -- returns
   *    {username,email, hashedpassword}
   */

  static async register(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      console.log(hashedPassword);
      console.log(username);
      const response = await db.query(
        `INSERT INTO users (username, email, password, registration_date )
      VALUES ($1,$2,$3,current_timestamp)
      RETURNING username,email, password,registration_date`,
        [username, email, hashedPassword]
      );
      const user = response.rows[0];
      return user;
    } catch (err) {
      // Handle any errors that occur during password hashing or database operation
      throw new Error(`Error registering user: ${err.message}`);
    }
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const results = await db.query(
      `SELECT password FROM users WHERE username=$1`,
      [username]
    );
    const user = results.rows[0];
    const response = await bcrypt.compare(password, user.password);
    return user && response;
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
}
module.exports = User;
