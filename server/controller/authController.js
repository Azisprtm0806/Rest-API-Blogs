const db = require("../database");
const { validate } = require("../validators/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM users");
    res.status(200).json({
      success: true,
      message: "Success call data.",
      data: user.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { username, email, password } = req.body;

    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (rows.length) {
      return res
        .status(500)
        .send({ message: "User with given email already exist!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await db.query(
      "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) returning *",
      [username, email, hashPassword]
    );

    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      data: user.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error!" });
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  payload = {
    id: user.user_id,
    email: user.email,
  };
  try {
    const token = await jwt.sign(payload, process.env.SECRET);
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in Succesfull",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  const accessToken = req.cookies.token;
  const payload = jwt.verify(accessToken, process.env.SECRET);
  try {
    return res.status(200).json({
      info: "protected info",
      data: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out Succesfull",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
