const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../database");

const loginFieldCheck = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * FROM users WHERE email = $1", [value]);
  if (!user.rows.length) {
    throw new Error("Email does not exists.");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.rows[0].password
  );

  if (!validPassword) {
    throw new Error("Wrong Password.");
  }

  req.user = user.rows[0];
});

module.exports = {
  loginValidation: [loginFieldCheck],
};
